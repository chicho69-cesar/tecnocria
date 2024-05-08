import { Router } from 'express'
import { AuthMiddleware } from '../../auth'
import { ResourcesController } from '../controllers'
import { ResourcesService } from '../services'

export class ResourcesRoutes {
  static get routes(): Router {
    const router = Router()

    const service = new ResourcesService()
    const controller = new ResourcesController(service)

    router.get('/books', [AuthMiddleware.validateAuth], controller.getBooksRecommendations)
    router.get('/audiovisual', [AuthMiddleware.validateAuth], controller.getAudiovisualRecommendations)

    return router
  }
}
