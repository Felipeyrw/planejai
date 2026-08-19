import { HistoryCard } from '@/components/features/History/HistoryCard'
import { PageHero } from '@/components/shared/PageHero'

export function SimulationHistoryPage() {
  return (
    <main className="max-w-6x1 sm>py-14 mx-auto px-4 py-10">
      <PageHero
        title="Histórico de simulações"
        subtitle="Acompanhe o histórico de seus planos financeiros."
      />
      <HistoryCard />
    </main>
  )
}
