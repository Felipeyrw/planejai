import { useCallback, useEffect, useRef, useState } from 'react'

import { buildAIPrompt } from '@/data/aiPrompt'
import type { SimulationRecord } from '@/data/simulation'
import { useSimulationStorage } from '@/hooks/useSimulationStorage'
import { type InsightData, getInsight } from '@/services/aiService'

export const useInsight = (id: string) => {
  const requestId = useRef(0)
  const { getFormData, updateSimulation } = useSimulationStorage()

  const [insightResult, setInsightResult] = useState<{
    id: string
    insight: InsightData
  } | null>(null)
  const [loadingId, setLoadingId] = useState<string | null>(null)
  const [errorResult, setErrorResult] = useState<{ id: string; message: string } | null>(null)
  const insight = insightResult?.id === id ? insightResult.insight : null
  const isLoading = loadingId === id
  const error = errorResult?.id === id ? errorResult.message : null

  // Necessário o uso do useCallback pois temos que colocar essa função
  // Como array de dependências do useEffect
  const fetchInsight = useCallback(
    async (simulationId: string) => {
      const currentRequestId = ++requestId.current
      const simulation = getFormData(simulationId)

      if (!simulation) {
        setErrorResult({ id: simulationId, message: 'Simulação não encontrada.' })
        return
      }

      setLoadingId(simulationId)
      setErrorResult(null)

      try {
        const prompt = buildAIPrompt(simulation)
        const data = await getInsight(prompt)

        if (currentRequestId !== requestId.current) {
          return
        }

        setInsightResult({ id: simulationId, insight: data })

        updateSimulation(simulationId, {
          ...simulation,
          insight: data,
        } as SimulationRecord)
      } catch (error) {
        if (currentRequestId === requestId.current) {
          setErrorResult({
            id: simulationId,
            message:
              error instanceof Error
                ? error.message
                : 'Ocorreu um erro inesperado ao gerar o diagnóstico.',
          })
        }
      } finally {
        if (currentRequestId === requestId.current) {
          setLoadingId(null)
        }
      }
    },
    [getFormData, updateSimulation],
  )

  useEffect(() => {
    requestId.current += 1
    let isActive = true
    void Promise.resolve().then(() => {
      if (isActive) {
        return fetchInsight(id)
      }
    })

    return () => {
      isActive = false
      requestId.current += 1
    }
  }, [id, fetchInsight])

  return { insight, isLoading, error, fetchInsight }
}
