import { Router } from 'express'
import { HealthRoutes } from '../modules/health'

export class AppRouter {
  static get routes(): Router {
    const router = Router()

    router.use('/api/health', HealthRoutes.routes)

    return router
  }
}
