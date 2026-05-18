'use client'

interface ComplexityMeterProps {
  complexity: number
}

export default function ComplexityMeter({ complexity }: ComplexityMeterProps) {
  const getComplexityLabel = (value: number) => {
    if (value < 30) return 'Simple'
    if (value < 60) return 'Moderate'
    if (value < 85) return 'Complex'
    return 'Very Complex'
  }

  const getComplexityColor = (value: number) => {
    if (value < 30) return 'from-green-500 to-emerald-500'
    if (value < 60) return 'from-yellow-500 to-amber-500'
    if (value < 85) return 'from-orange-500 to-red-500'
    return 'from-red-600 to-red-700'
  }

  return (
    <div className="bg-muted/50 border border-border rounded-lg p-6">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">Complexity Assessment</h3>
      
      <div className="space-y-4">
        <div className="relative h-12 bg-muted rounded-lg overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${getComplexityColor(complexity)} transition-all duration-500`}
            style={{ width: `${complexity}%` }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-bold text-foreground mix-blend-lighten">{complexity}%</span>
          </div>
        </div>
        
        <div>
          <p className="text-2xl font-bold text-foreground">{getComplexityLabel(complexity)}</p>
          <p className="text-xs text-muted-foreground mt-1">Task difficulty rating</p>
        </div>
      </div>
    </div>
  )
}
