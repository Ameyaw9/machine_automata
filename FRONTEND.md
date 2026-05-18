# Machine Automata - Frontend UI

A modern, systems-like web interface for the Machine Automata intelligent task automation engine.

## Features

- **Task Analyzer**: Submit task descriptions for intelligent analysis
- **Complexity Assessment**: Visual representation of task complexity levels
- **Automation Suggestions**: Get top automation suggestions with confidence scores
- **Implementation Guides**: Step-by-step implementation recommendations
- **Analytics Dashboard**: Track analysis trends and automation categories
- **Modern Design**: Dark-mode system UI with real-time interactions

## Tech Stack

- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with custom design tokens
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React for clean, consistent icons

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp .env.example .env.local
```

3. Update `.env.local` with your backend API URL if running the Python backend locally:
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Development

Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

Build for production:
```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main dashboard
│   └── globals.css         # Global styles & design tokens
├── components/
│   ├── DashboardHeader.tsx     # Header with nav
│   ├── TaskAnalyzer.tsx        # Task input form
│   ├── ResultsPanel.tsx        # Results display
│   ├── ComplexityMeter.tsx     # Complexity visualization
│   ├── AutomationSuggestions.tsx  # Suggestions list
│   ├── ImplementationGuide.tsx    # Implementation steps
│   └── Dashboard.tsx           # Analytics charts
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## Design System

The UI uses a cohesive dark-mode design with:
- **Primary**: Cyan (`190 100% 50%`)
- **Secondary**: Purple (`260 70% 55%`)
- **Background**: Dark (`0 0% 6%`)
- **Foreground**: Light (`0 0% 98%`)

All colors are CSS variables defined in `globals.css` for easy theming.

## API Integration

The frontend expects a Python backend API at `NEXT_PUBLIC_API_URL` with the following endpoints:

### Analyze Task
```
POST /api/analyze
Body: { "task_description": "string" }
Response: {
  "complexity": number,
  "estimated_time": "string",
  "suggestions": [{ "title", "description", "category", "confidence" }],
  "approach": "string",
  "steps": ["string"]
}
```

### Get History
```
GET /api/history
Response: [{ "id", "task", "results", "timestamp" }]
```

## Contributing

See the main project README for contribution guidelines.

## License

MIT License - See main project for details.
