import { Router } from 'express'
import { listServices } from './catalog.service.js'

export const catalogRouter = Router()
catalogRouter.get('/services', async (_req, res, next) => {
  try { res.json(await listServices()) } catch (error) { next(error) }
})
