import DashboardHeader from '@/components/DashboardHeader'
import TaskAnalyzer from '@/components/TaskAnalyzer'
import ResultsPanel from '@/components/ResultsPanel'

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <DashboardHeader />
      <main className="flex flex-col gap-8 p-8 max-w-7xl mx-auto">
        <div>
          <h1 className="text-3xl font-light text-foreground mb-2">Workflow Builder</h1>
          <p className="text-sm text-muted-foreground font-light">Define and deploy automation workflows</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <TaskAnalyzer />
          </div>
          <div className="lg:col-span-2">
            <ResultsPanel />
          </div>
        </div>
      </main>
    </div>
  )
}
