import DashboardHeader from '@/components/DashboardHeader'
import TaskAnalyzer from '@/components/TaskAnalyzer'
import ResultsPanel from '@/components/ResultsPanel'

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <DashboardHeader />
      <main className="flex flex-col gap-6 p-8 max-w-7xl mx-auto">
        <TaskAnalyzer />
        <ResultsPanel />
      </main>
    </div>
  )
}
