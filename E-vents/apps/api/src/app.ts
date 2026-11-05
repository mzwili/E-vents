import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { catalogRouter } from './modules/catalog/catalog.routes.js'
import { bookingsRouter } from './modules/bookings/bookings.routes.js'

export function createApp() {
  const app = express()
  app.use(helmet())
  app.use(cors({ origin: process.env.WEB_ORIGIN ?? 'http://localhost:5173' }))
  app.use(express.json({ limit: '1mb' }))
  app.get('/health', (_req, res) => res.json({ status: 'ok', service: 'evente-api' }))
  app.use('/api/v1/catalog', catalogRouter)
  app.use('/api/v1/bookings', bookingsRouter)
  app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error(err)
    res.status(500).json({ error: 'INTERNAL_ERROR', message: 'Something went wrong.' })
  })
  return app
}
