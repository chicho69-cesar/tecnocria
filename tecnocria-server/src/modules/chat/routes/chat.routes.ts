import { Router } from 'express'
import { AuthMiddleware } from '../../auth'
import { ChatController } from '../controllers'
import { ChatService } from '../services'

export class ChatRoutes {
  static get routes(): Router {
    const router = Router()

    const service = new ChatService()
    const controller = new ChatController(service)

    router.get('/by/:category', [AuthMiddleware.validateAuth], controller.getMessagesForConversation)
    router.get('/global', [AuthMiddleware.validateAuth], controller.getGlobalMessages)
    router.get('/hug-buddy', [AuthMiddleware.validateAuth], controller.getHugBuddyMessages)
    router.post('/hug-buddy', [AuthMiddleware.validateAuth], controller.createHugBuddyMessageAPI)

    return router
  }
}
