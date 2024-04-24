import { Router } from 'express'
import { HealthRoutes } from '../modules/health'
import { AuthRoutes } from '../modules/auth'

export class AppRouter {
  static get routes(): Router {
    const router = Router()

    router.use('/api/health', HealthRoutes.routes)
    router.use('/api/auth', AuthRoutes.routes)

    return router
  }
}
