'use client'

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
    <div className="border border-border rounded-lg p-6 bg-background">
      <h2 className="text-xs uppercase tracking-widest text-muted-foreground font-mono mb-6">Recommended Workflows</h2>

      <div className="space-y-3">
        {suggestions.map((suggestion) => (
          <div
            key={suggestion.id}
            className="border border-border rounded p-4 hover:bg-muted/30 transition-colors cursor-pointer group"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex-1">
                <h3 className="font-medium text-foreground text-sm group-hover:text-secondary transition-colors">
                  {suggestion.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">{suggestion.description}</p>
              </div>
              <span className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded whitespace-nowrap font-mono">
                {suggestion.category}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-secondary"
                  style={{ width: `${suggestion.confidence}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap font-mono">{suggestion.confidence}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
