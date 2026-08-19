import type { SimulationRecord } from '@/data/simulation'
import { calcMonthlySavings } from '@/utils/simulation'

import { ExternalLink, Goal, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

type HistoryCardProps = {
  item: SimulationRecord
  onDelete: (id: string) => void
}

export default function HistoryCard({ item, onDelete }: HistoryCardProps) {
  const navigate = useNavigate()
  const monthlySavings = calcMonthlySavings(item)

  return (
    <div className="border-border flex flex-col gap-5 border-b px-4 py-5 sm:flex-row sm:items-center sm:gap-6 sm:px-5 sm:py-4">
      {/* Ícone */}
      <div className="flex items-center gap-3">
        <div className="bg-muted-primary flex h-11 w-11 shrink-0 items-center justify-center rounded-xl">
          <Goal className="text-primary h-5 w-5" />
        </div>

        {/* Título + data */}
        <div className="flex min-w-0 flex-col sm:min-w-[170px]">
          <span className="text-foreground truncate text-sm font-semibold">{item.goalName}</span>
          <span className="text-muted-foreground text-xs">Simulação salva</span>
        </div>
      </div>

      {/* Colunas de informação */}
      <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
        <div className="flex flex-col sm:min-w-[110px]">
          <span className="text-muted-primary text-[11px] font-semibold uppercase tracking-wide">
            Custo da meta
          </span>
          <span className="text-foreground text-sm font-semibold">{item.goalAmount}</span>
        </div>

        <div className="flex flex-col sm:min-w-[110px]">
          <span className="text-muted-primary text-[11px] font-semibold uppercase tracking-wide">
            Prazo
          </span>
          <span className="text-foreground text-sm font-semibold">{item.goalDeadline} meses</span>
        </div>

        <div className="flex flex-col sm:min-w-[110px]">
          <span className="text-muted-primary text-[11px] font-semibold uppercase tracking-wide">
            Economia mensal
          </span>
          <span className="text-foreground text-sm font-semibold">
            R$ {monthlySavings.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      {/* Ações */}
      <div className="border-border flex items-center justify-end gap-3 border-t pt-4 sm:ml-auto sm:border-l sm:border-t-0 sm:pl-4 sm:pt-0">
        <button
          onClick={() => onDelete(item.id)}
          className="rounded-lg p-2 text-red-500 transition-colors hover:bg-red-500/10"
          aria-label="Excluir meta"
        >
          <Trash2 className="h-4 w-4" />
        </button>

        <button
          onClick={() => void navigate(`/resultado/${item.id}`)}
          className="bg-secondary-button text-foreground flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium transition-opacity hover:opacity-80"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          Ver detalhes
        </button>
      </div>
    </div>
  )
}
