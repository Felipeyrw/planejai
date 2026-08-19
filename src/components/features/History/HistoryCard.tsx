import type { LucideIcon } from 'lucide-react'
import { ExternalLink, Target, Trash2 } from 'lucide-react'

type HistoryCardProps = {
  icon?: LucideIcon
  title: string
  date: string
  goalCost: string
  deadline: string
  monthlySaving: string
  onDelete: () => void
  onDetails: () => void
  isLast?: boolean
}

export default function HistoryCard({
  icon: Icon = Target,
  title,
  date,
  goalCost,
  deadline,
  monthlySaving,
  onDelete,
  onDetails,
  isLast = false,
}: HistoryCardProps) {
  return (
    <div className={`flex items-center gap-6 px-5 py-4 ${!isLast ? 'border-border border-b' : ''}`}>
      {/* Ícone */}
      <div className="bg-muted-primary flex h-11 w-11 shrink-0 items-center justify-center rounded-xl">
        <Icon className="text-primary h-5 w-5" />
      </div>

      {/* Título + data */}
      <div className="flex min-w-[170px] flex-col">
        <span className="text-foreground text-sm font-semibold">{title}</span>
        <span className="text-muted-foreground text-xs">{date}</span>
      </div>

      {/* Colunas de informação */}
      <div className="flex min-w-[110px] flex-col">
        <span className="text-muted-primary text-[11px] font-semibold uppercase tracking-wide">
          Custo da meta
        </span>
        <span className="text-foreground text-sm font-semibold">{goalCost}</span>
      </div>

      <div className="flex min-w-[110px] flex-col">
        <span className="text-muted-primary text-[11px] font-semibold uppercase tracking-wide">
          Prazo
        </span>
        <span className="text-foreground text-sm font-semibold">{deadline}</span>
      </div>

      <div className="flex min-w-[110px] flex-col">
        <span className="text-muted-primary text-[11px] font-semibold uppercase tracking-wide">
          Economia mensal
        </span>
        <span className="text-foreground text-sm font-semibold">{monthlySaving}</span>
      </div>

      {/* Ações */}
      <div className="border-border ml-auto flex items-center gap-3 border-l pl-4">
        <button
          onClick={onDelete}
          className="rounded-lg p-2 text-red-500 transition-colors hover:bg-red-500/10"
          aria-label="Excluir meta"
        >
          <Trash2 className="h-4 w-4" />
        </button>

        <button
          onClick={onDetails}
          className="bg-secondary-button text-foreground flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium transition-opacity hover:opacity-80"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          Ver detalhes
        </button>
      </div>
    </div>
  )
}
