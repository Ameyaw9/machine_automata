'use client'

import { Settings, History, Zap } from 'lucide-react'

export default function DashboardHeader() {
  return (
    <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="flex items-center justify-between p-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <Zap className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Machine Automata</h1>
            <p className="text-sm text-muted-foreground">Intelligent Task Automation</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-muted/50 transition-colors text-muted-foreground hover:text-foreground">
            <History className="w-4 h-4" />
            <span className="text-sm">History</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-muted/50 transition-colors text-muted-foreground hover:text-foreground">
            <Settings className="w-4 h-4" />
            <span className="text-sm">Settings</span>
          </button>
        </div>
      </div>
    </header>
  )
}
