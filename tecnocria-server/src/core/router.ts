import { Router } from 'express'

export class AppRouter {
  static get routes(): Router {
    const router = Router()

    // TODO: Define the routes
    router.use('/api', (req, res) => {
      res.json({ message: 'Hello, world!!!' })
    })

    return router
  }
}
