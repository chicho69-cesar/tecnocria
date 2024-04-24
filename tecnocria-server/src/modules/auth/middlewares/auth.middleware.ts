import type { NextFunction, Request, Response } from 'express'
import { JWT } from '../../../config'
import { TokenModel, UserModel } from '../../../data/mongodb'
import { AuthValidator } from '../validators'

export class AuthMiddleware {
  static validateSignUpFields(req: Request, res: Response, next: NextFunction) {
    const validator = new AuthValidator()
    const { name, lastName, username, email, password, role } = req.body

    if (!name || !lastName || !username || !email || !password) {
      return res.status(400).json({ error: 'Missing fields' })
    }

    if (!validator.validateEmail(email)) {
      return res.status(400).json({ error: 'Invalid email' })
    }

    if (role && !validator.validateRole(role)) {
      return res.status(400).json({ error: 'Invalid role' })
    }

    next()
  }

  static validateSignInFields(req: Request, res: Response, next: NextFunction) {
    const validator = new AuthValidator()
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Missing fields' })
    }

    if (!validator.validateEmail(email)) {
      return res.status(400).json({ error: 'Invalid email' })
    }

    next()
  }

  static async validateAuth(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization

    if (!token) {
      return res.status(401).json({ error: 'Authorization not provided' })
    }

    const bearerToken = token.split(' ')[1]

    if (!bearerToken) {
      return res.status(401).json({ error: 'Invalid Authorization' })
    }

    const id = await JWT.validateToken<{ id: string }>(bearerToken)

    if (!id) {
      const tokenExists = await TokenModel.findOne({ token: bearerToken })
      if (tokenExists) {
        await TokenModel.deleteOne({ token: bearerToken })
        return res.status(401).json({ error: 'Authentication expired' })
      }

      return res.status(401).json({ error: 'Invalid Authorization' })
    }

    const user = await UserModel.findById(id)

    if (!user) {
      return res.status(401).json({ error: 'Invalid Authorization' })
    }

    const tokenExists = await TokenModel.findOne({ token: bearerToken, user: id })

    if (!tokenExists) {
      return res.status(401).json({ error: 'Invalid Authorization' })
    }

    req.body.user = user

    next()
  }
}
