'use client'

interface ImplementationGuideProps {
  approach: string
  steps: string[]
}

export default function ImplementationGuide({ approach, steps }: ImplementationGuideProps) {
  return (
    <div className="border border-border rounded-lg p-6 bg-background">
      <h2 className="text-xs uppercase tracking-widest text-muted-foreground font-mono mb-6">Setup Steps</h2>

      <div className="space-y-6">
        <div>
          <h3 className="text-xs uppercase tracking-widest text-muted-foreground font-mono mb-3">Approach</h3>
          <p className="text-foreground text-sm leading-relaxed p-4 bg-muted/30 rounded border border-border font-light">
            {approach}
          </p>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-widest text-muted-foreground font-mono mb-4">Steps</h3>
          <div className="space-y-2">
            {steps.map((step, index) => (
              <div key={index} className="flex gap-3 items-start py-2 border-b border-border last:border-0">
                <div className="flex items-center justify-center w-5 h-5 rounded text-secondary flex-shrink-0 text-xs font-mono font-bold">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div className="flex-1 pt-0.5">
                  <p className="text-sm text-foreground font-light">{step}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
