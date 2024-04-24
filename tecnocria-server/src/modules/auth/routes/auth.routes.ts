import { Router } from 'express'
import { AuthController } from '../controllers'
import { AuthMiddleware } from '../middlewares'
import { AuthService } from '../services'

export class AuthRoutes {
  static get routes(): Router {
    const router = Router()
    const service = new AuthService()
    const controller = new AuthController(service)

    router.post('/sign-up', [AuthMiddleware.validateSignUpFields], controller.signUp)
    router.post('/sign-in', [AuthMiddleware.validateSignInFields], controller.signIn)
    router.post('/sign-out', [AuthMiddleware.validateAuth], controller.signOut)
    router.get('/', [AuthMiddleware.validateAuth], controller.auth)

    return router
  }
}
