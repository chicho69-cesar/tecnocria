import { Router } from 'express'
import { ParentsController } from '../controllers'
import { ParentsService } from '../services'
import { AuthMiddleware } from '../../auth'

export class ParentsRoutes {
  static get routes(): Router {
    const router = Router()

    const service = new ParentsService()
    const controller = new ParentsController(service)

    router.get('/', [AuthMiddleware.validateAuth], controller.getParents)
    router.get('/:id', [AuthMiddleware.validateAuth], controller.getParent)
    router.post('/', [AuthMiddleware.validateAuth], controller.createParent)
    router.put('/:id', [AuthMiddleware.validateAuth], controller.updateParent)
    router.delete('/:id', [AuthMiddleware.validateAuth], controller.deleteParent)
    router.post('/upload/:id', [AuthMiddleware.validateAuth], controller.uploadParentImage)

    return router
  }
}
