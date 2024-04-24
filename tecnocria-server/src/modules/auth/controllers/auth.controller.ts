import type { Request, Response } from 'express'
import { IAuth } from '../interfaces'
import { Auth } from '../models'
import { AuthService } from '../services'
import { CustomError } from '../../../core/errors'

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message })
    }

    return res.status(500).json({ error: 'Internal Server Error' })
  }

  signUp = (req: Request, res: Response) => {
    const auth = Auth.createAuth(req.body as IAuth)

    this.authService
      .signUp(auth)
      .then((data) => res.status(201).json(data))
      .catch((error) => this.handleError(error, res))
  }

  signIn = (req: Request, res: Response) => {
    const { email, password } = req.body

    this.authService
      .signIn(email, password)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res))
  }

  signOut = (req: Request, res: Response) => {
    const { token } = req.body as { token: string }

    this.authService
      .signOut(token)
      .then(() => res.status(200).json({ message: 'User logged out' }))
      .catch((error) => this.handleError(error, res))
  }

  auth = (req: Request, res: Response) => {
    const { user } = req.body
    res.status(200).json({ user })
  }
}
