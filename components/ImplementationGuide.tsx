'use client'

import { CheckCircle, ArrowRight } from 'lucide-react'

interface ImplementationGuideProps {
  approach: string
  steps: string[]
}

export default function ImplementationGuide({ approach, steps }: ImplementationGuideProps) {
  return (
    <div className="bg-muted/50 border border-border rounded-lg p-6">
      <h2 className="text-lg font-semibold text-foreground mb-6">Implementation Guide</h2>

      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">Recommended Approach</h3>
          <p className="text-foreground text-sm leading-relaxed p-3 bg-background/50 rounded border border-border">
            {approach}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Implementation Steps</h3>
          <div className="space-y-3">
            {steps.map((step, index) => (
              <div key={index} className="flex gap-3 items-start">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary flex-shrink-0 text-xs font-bold mt-0.5">
                  {index + 1}
                </div>
                <div className="flex-1 pt-0.5">
                  <p className="text-sm text-foreground">{step}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium flex items-center justify-center gap-2 group">
          <span>View Full Implementation Details</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  )
}
