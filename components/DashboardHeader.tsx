'use client'

import { Menu, Settings } from 'lucide-react'

export default function DashboardHeader() {
  return (
    <header className="border-b border-border bg-background sticky top-0 z-50">
      <div className="flex items-center justify-between px-8 py-4 max-w-full">
        <div className="flex items-center gap-3">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-light tracking-tight text-foreground">automata</span>
            <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium">system</span>
          </div>
        </div>
        
        <nav className="flex items-center gap-8">
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors font-light">Workflows</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors font-light">History</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors font-light">Logs</a>
          </div>
          <button className="p-2 hover:bg-muted/50 rounded transition-colors text-muted-foreground hover:text-foreground">
            <Settings className="w-4 h-4" />
          </button>
        </nav>
      </div>
    </header>
  )
}
