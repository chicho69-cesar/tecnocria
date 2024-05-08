import { Router } from 'express'
import { AuthMiddleware } from '../../auth'
import { AdviceController } from '../controllers'
import { AdviceService } from '../services'

export class AdviceRoutes {
  static get routes(): Router {
    const router = Router()

    const service = new AdviceService()
    const controller = new AdviceController(service)

    router.post('/', [AuthMiddleware.validateAuth], controller.getAdvices)
    router.post('/give-me', [AuthMiddleware.validateAuth], controller.giveMeAnAdvice)

    return router
  }
}
