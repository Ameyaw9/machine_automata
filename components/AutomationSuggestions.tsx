'use client'

import { Zap, TrendingUp } from 'lucide-react'

interface Suggestion {
  id: number
  title: string
  description: string
  category: string
  confidence: number
}

interface AutomationSuggestionsProps {
  suggestions: Suggestion[]
}

export default function AutomationSuggestions({ suggestions }: AutomationSuggestionsProps) {
  return (
    <div className="bg-muted/50 border border-border rounded-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Zap className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Top Automation Suggestions</h2>
      </div>

      <div className="space-y-4">
        {suggestions.map((suggestion) => (
          <div
            key={suggestion.id}
            className="bg-background/50 border border-border rounded-lg p-4 hover:border-primary/50 transition-colors cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {suggestion.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">{suggestion.description}</p>
              </div>
              <span className="text-xs px-2 py-1 bg-secondary/20 text-secondary rounded whitespace-nowrap ml-2">
                {suggestion.category}
              </span>
            </div>

            <div className="flex items-center gap-2 mt-3">
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-secondary"
                  style={{ width: `${suggestion.confidence}%` }}
                />
              </div>
              <span className="text-xs font-semibold text-foreground whitespace-nowrap">{suggestion.confidence}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
