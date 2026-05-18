'use client'

import { useState } from 'react'
import { Send, Sparkles } from 'lucide-react'

export default function TaskAnalyzer() {
  const [taskDescription, setTaskDescription] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleAnalyze = async () => {
    if (!taskDescription.trim()) return
    
    setIsAnalyzing(true)
    // Simulate analysis
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsAnalyzing(false)
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-2">Analyze Your Task</h2>
        <p className="text-sm text-muted-foreground">Describe the task you want to automate and get intelligent suggestions</p>
      </div>
      
      <div className="relative">
        <textarea
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          placeholder="Enter your task description here... For example: 'I need to process customer data from a CSV file and send automated emails'"
          className="w-full h-32 px-4 py-3 bg-muted border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
        />
        <div className="absolute bottom-3 right-3 flex gap-2">
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing || !taskDescription.trim()}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {isAnalyzing ? (
              <>
                <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Analyze Task</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
