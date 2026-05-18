'use client'

import ComplexityMeter from './ComplexityMeter'
import AutomationSuggestions from './AutomationSuggestions'
import ImplementationGuide from './ImplementationGuide'

export default function ResultsPanel() {
  // Demo data - will be replaced with actual API responses
  const mockResults = {
    complexity: 65,
    estimatedTime: '4-6 hours',
    suggestions: [
      {
        id: 1,
        title: 'CSV Data Processing Pipeline',
        description: 'Automate the CSV file reading and data transformation',
        category: 'Data Processing',
        confidence: 92,
      },
      {
        id: 2,
        title: 'Email Automation Service',
        description: 'Set up automated email sending with templates',
        category: 'Email Automation',
        confidence: 88,
      },
      {
        id: 3,
        title: 'Scheduled Task Execution',
        description: 'Run the automation on a daily or weekly schedule',
        category: 'Scheduled Tasks',
        confidence: 85,
      },
    ],
    approach: 'Use a Python script with pandas for data processing and SMTP for email automation',
    steps: [
      'Set up Python environment with required libraries',
      'Create CSV parsing module',
      'Design email template system',
      'Implement SMTP configuration',
      'Add error handling and logging',
      'Test with sample data',
      'Schedule with cron jobs',
    ],
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ComplexityMeter complexity={mockResults.complexity} />
        
        <div className="border border-border rounded-lg p-6 bg-background">
          <h3 className="text-xs uppercase tracking-widest text-muted-foreground font-mono mb-3">Time Estimate</h3>
          <p className="text-2xl font-light text-foreground">{mockResults.estimatedTime}</p>
          <p className="text-xs text-muted-foreground mt-2 font-light">for implementation</p>
        </div>

        <div className="border border-border rounded-lg p-6 bg-background">
          <h3 className="text-xs uppercase tracking-widest text-muted-foreground font-mono mb-3">Categories</h3>
          <div className="flex flex-wrap gap-2">
            {mockResults.suggestions.map((s) => (
              <span key={s.id} className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded font-mono">
                {s.category}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AutomationSuggestions suggestions={mockResults.suggestions} />
        <ImplementationGuide approach={mockResults.approach} steps={mockResults.steps} />
      </div>
    </div>
  )
}
