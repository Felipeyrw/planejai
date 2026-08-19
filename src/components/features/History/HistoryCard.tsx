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
    <div className={`border-border flex items-center gap-6 border-b px-5 py-4`}>
      {/* Ícone */}
      <div className="bg-muted-primary flex h-11 w-11 shrink-0 items-center justify-center rounded-xl">
        <Goal className="text-primary h-5 w-5" />
      </div>

      {/* Título + data */}
      <div className="flex min-w-[170px] flex-col">
        <span className="text-foreground text-sm font-semibold">{item.goalName}</span>
        <span className="text-muted-foreground text-xs">Simulação salva</span>
      </div>

      {/* Colunas de informação */}
      <div className="flex min-w-[110px] flex-col">
        <span className="text-muted-primary text-[11px] font-semibold uppercase tracking-wide">
          Custo da meta
        </span>
        <span className="text-foreground text-sm font-semibold">{item.goalAmount}</span>
      </div>

      <div className="flex min-w-[110px] flex-col">
        <span className="text-muted-primary text-[11px] font-semibold uppercase tracking-wide">
          Prazo
        </span>
        <span className="text-foreground text-sm font-semibold">{item.goalDeadline} meses</span>
      </div>

      <div className="flex min-w-[110px] flex-col">
        <span className="text-muted-primary text-[11px] font-semibold uppercase tracking-wide">
          Economia mensal
        </span>
        <span className="text-foreground text-sm font-semibold">
          R$ {monthlySavings.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </span>
      </div>

      {/* Ações */}
      <div className="border-border ml-auto flex items-center gap-3 border-l pl-4">
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
