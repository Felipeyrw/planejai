import { useCallback, useEffect, useRef, useState } from 'react'

import { buildAIPrompt } from '@/data/aiPrompt'
import type { SimulationRecord } from '@/data/simulation'
import { useSimulationStorage } from '@/hooks/useSimulationStorage'
import { type InsightData, getInsight } from '@/services/aiService'

export const useInsight = (id: string) => {
  const isRequestPending = useRef(false)
  const requestId = useRef(0)
  const { getFormData, updateSimulation } = useSimulationStorage()

  const [insight, setInsight] = useState<InsightData | null>(null)

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Necessário o uso do useCallback pois temos que colocar essa função
  // Como array de dependências do useEffect
  const fetchInsight = useCallback(
    async (simulationId: string) => {
      const simulation = getFormData(simulationId)

      if (!simulation) {
        setError('Simulação não encontrada.')
        return
      }

      isRequestPending.current = true
      setIsLoading(true)
      setError(null)
      const currentRequestId = ++requestId.current

      try {
        const prompt = buildAIPrompt(simulation)
        const data = await getInsight(prompt)

        if (currentRequestId !== requestId.current) {
          return
        }

        setInsight(data)

        updateSimulation(simulationId, {
          ...simulation,
          insight: data,
        } as SimulationRecord)
      } catch {
        setError('Erro ao gerar o diagnóstico. Tente novamente.')
      } finally {
        isRequestPending.current = false
        setIsLoading(false)
      }
    },
    [getFormData, updateSimulation],
  )

  useEffect(() => {
    requestId.current += 1
    isRequestPending.current = false
    setInsight(null)
    setError(null)

    // Evita loop infinito de requisições para a API do Gemini
    if (isLoading || isRequestPending.current) {
      return
    }

    fetchInsight(id)
  }, [id, fetchInsight])

  return { insight, isLoading, error, fetchInsight }
}
