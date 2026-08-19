import { useState } from 'react'

import { useSimulationStorage } from '@/hooks/useSimulationStorage'

import HistoryCard from './HistoryCard'

export function HistoryList() {
  const { deleteSimulation, getAllFormData } = useSimulationStorage()
  const [history, setHistory] = useState(() => getAllFormData())
  const handleDelete = (id: string) => {
    deleteSimulation(id)
    setHistory((currentHistory) => currentHistory.filter((item) => item.id !== id))
  }

  return (
    <ul>
      {history.map((item) => (
        <li key={item.id} className="mb-4">
          <HistoryCard item={item} onDelete={handleDelete} />
        </li>
      ))}
    </ul>
  )
}
