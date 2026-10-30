interface GeminiResponse {
  candidates?: {
    content?: {
      parts?: { text?: string }[]
    }
    finishReason?: string
  }[]
  promptFeedback?: {
    blockReason?: string
  }
}

interface GeminiErrorResponse {
  error?: {
    message?: string
  }
}

export interface InsightData {
  feasibility: {
    status: 'viable' | 'needs_adjustment' | 'unfeasible'
    content: string
  }
  diagnosis: {
    content: string
  }
  suggestions: {
    items: string[]
  }
  extraIncome: {
    items: string[]
  }
  investment: {
    items: string[]
  }
  motivation: {
    content: string
  }
}

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const MODEL_NAME = 'gemini-flash-latest'
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent`

const callGeminiAPI = async (prompt: string) => {
  const apiKey = API_KEY?.trim()
  if (!apiKey) {
    throw new Error('A chave VITE_GEMINI_API_KEY não está configurada.')
  }

  const response = await fetch(GEMINI_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': apiKey,
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: 'application/json',
      },
    }),
  })

  const responseBody = await response.text()

  if (!response.ok) {
    let message: string
    try {
      const errorResponse = JSON.parse(responseBody) as GeminiErrorResponse
      message = errorResponse.error?.message || responseBody
    } catch {
      message = responseBody
    }

    throw new Error(
      `Gemini retornou HTTP ${response.status}${message ? `: ${message.slice(0, 500)}` : ''}`,
    )
  }

  try {
    return JSON.parse(responseBody) as GeminiResponse
  } catch {
    throw new Error('O Gemini retornou uma resposta que não é JSON válido.')
  }
}

const isInsightData = (value: unknown): value is InsightData => {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const insight = value as Record<string, unknown>
  const feasibility = insight.feasibility as Record<string, unknown> | undefined
  const diagnosis = insight.diagnosis as Record<string, unknown> | undefined
  const motivation = insight.motivation as Record<string, unknown> | undefined
  const suggestions = insight.suggestions as Record<string, unknown> | undefined
  const extraIncome = insight.extraIncome as Record<string, unknown> | undefined
  const investment = insight.investment as Record<string, unknown> | undefined

  const isStringList = (list: unknown) =>
    Array.isArray(list) && list.every((item) => typeof item === 'string')

  return (
    (feasibility?.status === 'viable' ||
      feasibility?.status === 'needs_adjustment' ||
      feasibility?.status === 'unfeasible') &&
    typeof feasibility.content === 'string' &&
    typeof diagnosis?.content === 'string' &&
    typeof motivation?.content === 'string' &&
    isStringList(suggestions?.items) &&
    isStringList(extraIncome?.items) &&
    isStringList(investment?.items)
  )
}

export const getInsight = async (prompt: string) => {
  const response = await callGeminiAPI(prompt)
  const candidate = response.candidates?.[0]

  if (!candidate) {
    const reason = response.promptFeedback?.blockReason
    throw new Error(
      reason
        ? `O Gemini bloqueou a solicitação (${reason}).`
        : 'O Gemini não retornou uma resposta. Verifique o modelo e as permissões da chave.',
    )
  }

  if (candidate.finishReason && candidate.finishReason !== 'STOP') {
    throw new Error(`A geração do Gemini foi interrompida (${candidate.finishReason}).`)
  }

  const json = candidate.content?.parts
    ?.map((part) => part.text ?? '')
    .join('')
    .trim()
  if (!json) {
    throw new Error('O Gemini retornou uma resposta vazia.')
  }

  let data: unknown
  try {
    data = JSON.parse(json)
  } catch {
    throw new Error('O Gemini retornou conteúdo que não é JSON válido.')
  }

  if (!isInsightData(data)) {
    throw new Error('A resposta do Gemini não contém todos os campos esperados.')
  }

  return data
}
