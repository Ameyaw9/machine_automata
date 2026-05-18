# Machine Automata - Deployment Guide

## Deploying to Vercel

The recommended way to deploy Machine Automata frontend is using Vercel.

### Prerequisites
- Vercel account (free or paid)
- GitHub account with the repository

### Steps

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Add modern UI for Machine Automata"
   git push origin project-changes
   ```

2. **Deploy on Vercel**
   - Visit [vercel.com/new](https://vercel.com/new)
   - Connect your GitHub repository
   - Select the branch `project-changes`
   - Configure environment variables:
     ```
     NEXT_PUBLIC_API_URL=<your-backend-api-url>
     ```
   - Click Deploy

3. **Configure Backend Connection**
   - Update `NEXT_PUBLIC_API_URL` in Vercel project settings
   - Point to your Python backend server

## Running Locally

### Development
```bash
npm install
npm run dev
```

Access at `http://localhost:3000`

### Production Build
```bash
npm run build
npm start
```

## Backend Integration

The frontend expects a Python API at the endpoint configured in `NEXT_PUBLIC_API_URL`.

### Required Endpoints

**POST /api/analyze**
```json
Request: {
  "task_description": "string"
}

Response: {
  "complexity": number (0-100),
  "estimated_time": "string",
  "suggestions": [
    {
      "id": number,
      "title": "string",
      "description": "string", 
      "category": "string",
      "confidence": number (0-100)
    }
  ],
  "approach": "string",
  "steps": ["string"]
}
```

**GET /api/history**
```json
Response: [
  {
    "id": "string",
    "task": "string",
    "results": "object",
    "timestamp": "string"
  }
]
```

**GET /api/stats**
```json
Response: {
  "total_analyses": number,
  "total_automations": number,
  "success_rate": number,
  "avg_complexity": number
}
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_API_URL` | Yes | Backend API endpoint URL |
| `NEXT_PUBLIC_ENABLE_ANALYTICS` | No | Enable analytics dashboard (default: true) |
| `NEXT_PUBLIC_ENABLE_HISTORY` | No | Enable history feature (default: true) |

## Performance Optimization

- Static assets are cached on Vercel CDN
- API calls are optimized with caching headers
- Charts use Recharts for efficient rendering
- Dark mode reduces eye strain for long sessions

## Troubleshooting

### API Connection Issues
- Verify `NEXT_PUBLIC_API_URL` is correct
- Check CORS headers on backend
- Ensure backend is running and accessible

### Build Errors
- Clear node_modules: `rm -rf node_modules && npm install`
- Check Node version: `node --version` (should be 18+)
- Review build logs in Vercel dashboard

### Performance Issues
- Use Chrome DevTools to identify slow components
- Check network tab for API response times
- Review Vercel Analytics in dashboard

## Next Steps

1. Deploy frontend to Vercel
2. Connect Python backend API
3. Test all features in production
4. Set up monitoring and error tracking
5. Configure custom domain (optional)
