import { Router } from 'express'
import { AdviceRoutes } from '../modules/advices'
import { AIRoutes } from '../modules/ai'
import { AuthRoutes } from '../modules/auth'
import { BinnacleRoutes } from '../modules/binnacle'
import { ChatRoutes } from '../modules/chat'
import { HealthRoutes } from '../modules/health'
import { ParentsRoutes } from '../modules/parents'
import { ResourcesRoutes } from '../modules/resources'
import { UsersRoutes } from '../modules/users'

export class AppRouter {
  static get routes(): Router {
    const router = Router()

    router.use('/api/advices', AdviceRoutes.routes)
    router.use('/api/ai', AIRoutes.routes)
    router.use('/api/auth', AuthRoutes.routes)
    router.use('/api/binnacles', BinnacleRoutes.routes)
    router.use('/api/chats', ChatRoutes.routes)
    router.use('/api/health', HealthRoutes.routes)
    router.use('/api/parents', ParentsRoutes.routes)
    router.use('/api/resources', ResourcesRoutes.routes)
    router.use('/api/users', UsersRoutes.routes)

    return router
  }
}
