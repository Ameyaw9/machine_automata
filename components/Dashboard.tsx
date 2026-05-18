'use client'

import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { TrendingUp } from 'lucide-react'

const automationTrends = [
  { month: 'Jan', analyses: 24, automations: 18 },
  { month: 'Feb', analyses: 32, automations: 25 },
  { month: 'Mar', analyses: 28, automations: 22 },
  { month: 'Apr', analyses: 45, automations: 38 },
  { month: 'May', analyses: 52, automations: 45 },
]

const categoryDistribution = [
  { category: 'Data Processing', count: 45 },
  { category: 'Web Automation', count: 32 },
  { category: 'Email Automation', count: 28 },
  { category: 'API Integration', count: 24 },
  { category: 'System Monitoring', count: 18 },
]

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-semibold text-foreground">Analytics & Insights</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trends Chart */}
        <div className="bg-muted/50 border border-border rounded-lg p-6">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">Analysis Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={automationTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--muted))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '0.5rem',
                  color: 'hsl(var(--foreground))'
                }}
              />
              <Line type="monotone" dataKey="analyses" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: 'hsl(var(--primary))' }} />
              <Line type="monotone" dataKey="automations" stroke="hsl(var(--secondary))" strokeWidth={2} dot={{ fill: 'hsl(var(--secondary))' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="bg-muted/50 border border-border rounded-lg p-6">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">Task Categories</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="category" stroke="hsl(var(--muted-foreground))" angle={-45} textAnchor="end" height={80} />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--muted))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '0.5rem',
                  color: 'hsl(var(--foreground))'
                }}
              />
              <Bar dataKey="count" fill="hsl(var(--primary))" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Analyses', value: '245', change: '+12%' },
          { label: 'Automations Suggested', value: '187', change: '+8%' },
          { label: 'Success Rate', value: '94%', change: '+2%' },
          { label: 'Avg Complexity', value: '62%', change: '-3%' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-muted/50 border border-border rounded-lg p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold mb-1">{stat.label}</p>
            <div className="flex items-baseline justify-between">
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <span className={`text-xs font-semibold ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
