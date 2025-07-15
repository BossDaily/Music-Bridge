import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { cors } from 'hono/cors';
import { serve } from '@hono/node-server';
import type { Context } from 'hono';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { drizzle } from 'drizzle-orm/node-postgres';
import { auth } from './lib/auth';

// Load environment variables from the root directory
// Try multiple possible locations for the .env file
const possibleEnvPaths = [
  path.resolve(process.cwd(), '.env'),
  path.resolve(__dirname, '../../../.env'),
  path.resolve(__dirname, '../../.env'),
];

for (const envPath of possibleEnvPaths) {
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
    console.log(`Loaded environment variables from: ${envPath}`);
    break;
  }
}

const db = drizzle(process.env.DATABASE_URL!);
const app = new Hono()

// Middleware
app.use('*', logger())
app.use('*', cors({
  origin: ['http://localhost:4321', 'http://localhost:3000'],
  credentials: true,
}))

// Routes
app.get('/', (c: Context) => {
  return c.json({
    message: 'Music Bridge Backend API',
    version: '1.0.0',
    status: 'healthy'
  })
})

// Better Auth routes
app.on(['POST', 'GET'], '/api/auth/*', async (c: Context) => {
  return auth.handler(c.req.raw);
});

app.get('/api/health', (c: Context) => {
  return c.json({
    status: 'ok',
    timestamp: new Date().toISOString()
  })
})

// Music-related endpoints
app.get('/api/tracks', (c: Context) => {
  return c.json({
    tracks: [
      { id: 1, title: 'Sample Track 1', artist: 'Artist 1', duration: 180 },
      { id: 2, title: 'Sample Track 2', artist: 'Artist 2', duration: 220 },
    ]
  })
})

app.post('/api/tracks', async (c: Context) => {
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
