import { HistoryList } from '@/components/features/History/HistoryList'
import { PageHero } from '@/components/shared/PageHero'

export function SimulationHistoryPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <PageHero
        title="Histórico de simulações"
        subtitle="Acompanhe o histórico de seus planos financeiros."
      />
      <HistoryList />
    </main>
  )
}
