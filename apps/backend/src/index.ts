const { Hono } = require('hono');
const { logger } = require('hono/logger');
const { cors } = require('hono/cors');
const { serve } = require('@hono/node-server');

const app = new Hono()

// Middleware
app.use('*', logger())
app.use('*', cors({
  origin: ['http://localhost:4321', 'http://localhost:3000'],
  credentials: true,
}))

// Routes
app.get('/', (c) => {
  return c.json({
    message: 'Music Bridge Backend API',
    version: '1.0.0',
    status: 'healthy'
  })
})

app.get('/api/health', (c) => {
  return c.json({
    status: 'ok',
    timestamp: new Date().toISOString()
  })
})

// Music-related endpoints
app.get('/api/tracks', (c) => {
  return c.json({
    tracks: [
      { id: 1, title: 'Sample Track 1', artist: 'Artist 1', duration: 180 },
      { id: 2, title: 'Sample Track 2', artist: 'Artist 2', duration: 220 },
    ]
  })
})

app.post('/api/tracks', async (c) => {
  const body = await c.req.json()
  return c.json({
    message: 'Track created',
    track: { id: Date.now(), ...body }
  }, 201)
})

const port = Number(process.env.PORT) || 8000

console.log(`🔥 Hono server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
