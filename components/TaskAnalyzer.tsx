'use client'

import { useState } from 'react'
import { Play } from 'lucide-react'

export default function TaskAnalyzer() {
  const [taskDescription, setTaskDescription] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleAnalyze = async () => {
    if (!taskDescription.trim()) return
    
    setIsAnalyzing(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsAnalyzing(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-baseline gap-2">
        <h2 className="text-lg font-light text-foreground">Define Workflow</h2>
        <span className="text-xs text-muted-foreground font-mono">step 1 of 3</span>
      </div>
      
      <div className="border border-border rounded-lg overflow-hidden">
        <textarea
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          placeholder="Describe the process to automate. Example: Process CSV files from S3, validate data, and trigger email notifications..."
          className="w-full h-32 px-4 py-3 bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-secondary focus:ring-inset resize-none"
        />
        <div className="flex items-center justify-between px-4 py-3 bg-muted/30 border-t border-border">
          <div className="text-xs text-muted-foreground font-mono">
            {taskDescription.length} characters
          </div>
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing || !taskDescription.trim()}
            className="flex items-center gap-2 px-3 py-2 bg-secondary text-secondary-foreground rounded hover:bg-secondary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-medium text-sm"
          >
            {isAnalyzing ? (
              <>
                <div className="w-3 h-3 border border-secondary-foreground border-t-transparent rounded-full animate-spin" />
                <span>Analyzing</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3" />
                <span>Analyze</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
