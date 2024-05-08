import { Router } from 'express'
import { BinnacleService } from '../services'
import { BinnacleController } from '../controllers'
import { AuthMiddleware } from '../../auth'

export class BinnacleRoutes {
  static get routes(): Router {
    const router = Router()

    const service = new BinnacleService()
    const controller = new BinnacleController(service)

    router.get('/', [AuthMiddleware.validateAuth], controller.getBinnacles)
    router.get('/:id', [AuthMiddleware.validateAuth], controller.getBinnacle)
    router.post('/', [AuthMiddleware.validateAuth], controller.createBinnacle)
    router.put('/:id', [AuthMiddleware.validateAuth], controller.updateBinnacle)
    router.delete('/:id', [AuthMiddleware.validateAuth], controller.deleteBinnacle)
    router.patch('/assign/:id', [AuthMiddleware.validateAuth], controller.assignParent)
    router.patch('/remove/:id', [AuthMiddleware.validateAuth], controller.removeParent)

    return router
  }
}
