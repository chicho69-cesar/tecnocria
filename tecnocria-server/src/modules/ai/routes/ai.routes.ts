import { Router } from 'express'
import { AuthMiddleware } from '../../auth'
import { AIController } from '../controllers'
import { AIService } from '../services'

export class AIRoutes {
  static get routes(): Router {
    const router = Router()

    const service = new AIService()
    const controller = new AIController(service)

    router.get('/', [AuthMiddleware.validateAuth], controller.testAI)

    return router
  }
}
