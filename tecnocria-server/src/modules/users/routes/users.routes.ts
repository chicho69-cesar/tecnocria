import { Router } from 'express'
import { UsersService } from '../services'
import { UsersController } from '../controllers'
import { AuthMiddleware } from '../../auth'

export class UsersRoutes {
  static get routes(): Router {
    const router = Router()

    const service = new UsersService()
    const controller = new UsersController(service)

    router.patch('/edit', [AuthMiddleware.validateAuth], controller.editInfo)
    router.post('/upload', [AuthMiddleware.validateAuth], controller.uploadUserImage)

    return router
  }
}
