import { Router } from 'express'
import { HealthController } from '../controllers'

export class HealthRoutes {
  static get routes(): Router {
    const router = Router()
    const controller = new HealthController()

    router.get('/', controller.healthCheck)
    router.get('/is-healthy', controller.getIsHealthy)

    return router
  }
}
