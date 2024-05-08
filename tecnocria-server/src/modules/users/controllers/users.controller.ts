import type { Request, Response } from 'express'
import { CustomError } from '../../../core/errors'
import { UsersService } from '../services'
import { User } from '../models'
import { IUser } from '../interfaces'

export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message })
    }

    return res.status(500).json({ error: 'Internal Server Error' })
  }

  editInfo = (req: Request, res: Response) => {
    const { userId } = req.body as { userId: string }
    const user = User.create(req.body as IUser)

    this.usersService
      .editInfo(user, userId)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res))
  }

  uploadUserImage = (req: Request, res: Response) => {
    const { userId } = req.body as { userId: string }

    this.usersService
      .uploadImage(userId, req.files)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res))
  }
}
