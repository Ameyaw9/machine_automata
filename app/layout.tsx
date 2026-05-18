import type { Metadata } from 'next'
import './globals.css'
import AutomationPatterns from '@/components/AutomationPatterns'

export const metadata: Metadata = {
  title: 'Machine Automata',
  description: 'Intelligent task automation analysis and suggestions',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="bg-background">
      <body>
        <AutomationPatterns />
        {children}
      </body>
    </html>
  )
}
