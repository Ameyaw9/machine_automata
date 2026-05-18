import type { Metadata } from 'next'
import './globals.css'

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
      <body>{children}</body>
    </html>
  )
}
