'use client'

interface ComplexityMeterProps {
  complexity: number
}

export default function ComplexityMeter({ complexity }: ComplexityMeterProps) {
  const getComplexityLabel = (value: number) => {
    if (value < 30) return 'Low'
    if (value < 60) return 'Medium'
    if (value < 85) return 'High'
    return 'Very High'
  }

  const getComplexityColor = (value: number) => {
    if (value < 30) return 'bg-green-600'
    if (value < 60) return 'bg-yellow-600'
    if (value < 85) return 'bg-orange-600'
    return 'bg-red-600'
  }

  return (
    <div className="border border-border rounded-lg p-6 bg-background">
      <div className="mb-6">
        <h3 className="text-xs uppercase tracking-widest text-muted-foreground font-mono mb-4">Complexity</h3>
        
        <div className="space-y-3">
          <div className="relative h-2 bg-muted rounded-full overflow-hidden">
            <div
              className={`h-full ${getComplexityColor(complexity)} transition-all duration-500`}
              style={{ width: `${complexity}%` }}
            />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-light text-foreground">{complexity}%</span>
            <span className="text-xs text-muted-foreground">{getComplexityLabel(complexity)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
