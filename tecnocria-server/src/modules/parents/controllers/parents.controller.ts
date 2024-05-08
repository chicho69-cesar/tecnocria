import type { Request, Response } from 'express'
import { CustomError } from '../../../core/errors'
import { ParentsService } from '../services'
import { Parent } from '../models'
import { IParent } from '../interfaces'

export class ParentsController {
  constructor(private readonly parentsService: ParentsService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message })
    }

    return res.status(500).json({ error: 'Internal Server Error' })
  }

  getParents = (req: Request, res: Response) => {
    const { userId } = req.body as { userId: string }

    this.parentsService
      .getParents(userId)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res))
  }

  getParent = (req: Request, res: Response) => {
    const { id } = req.params as { id: string }
    const { userId } = req.body as { userId: string }

    this.parentsService
      .getParent(id, userId)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res))
  }

  createParent = (req: Request, res: Response) => {
    const { userId } = req.body as { userId: string }
    const parent = Parent.createParent(req.body as IParent)

    this.parentsService
      .createParent(parent, userId)
      .then((data) => res.status(201).json(data))
      .catch((error) => this.handleError(error, res))
  }

  updateParent = (req: Request, res: Response) => {
    const { id } = req.params as { id: string }
    const { userId } = req.body as { userId: string }
    const parent = Parent.createParent(req.body as IParent)

    this.parentsService
      .updateParent(id, parent, userId)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res))
  }

  deleteParent = (req: Request, res: Response) => {
    const { id } = req.params as { id: string }
    const { userId } = req.body as { userId: string }

    this.parentsService
      .deleteParent(id, userId)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res))
  }

  uploadParentImage = (req: Request, res: Response) => {
    const { id } = req.params as { id: string }
    const { userId } = req.body as { userId: string }

    this.parentsService
      .uploadImage(id, userId, req.files)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res))
  }
}
