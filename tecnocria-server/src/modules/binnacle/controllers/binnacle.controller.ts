import type { Request, Response } from 'express'
import { CustomError } from '../../../core/errors'
import { BinnacleService } from '../services'
import { IBinnacle } from '../interfaces'
import { Binnacle } from '../models'

export class BinnacleController {
  constructor(private readonly binnacleService: BinnacleService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message })
    }

    return res.status(500).json({ error: 'Internal Server Error' })
  }

  getBinnacles = (req: Request, res: Response) => {
    const { userId } = req.body as { userId: string }

    this.binnacleService
      .getBinnacles(userId)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res))
  }

  getBinnacle = (req: Request, res: Response) => {
    const { id } = req.params as { id: string }
    const { userId } = req.body as { userId: string }

    this.binnacleService
      .getBinnacle(id, userId)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res))
  }

  createBinnacle = (req: Request, res: Response) => {
    const { userId } = req.body as { userId: string }
    const binnacle = Binnacle.createBinnacle(req.body as IBinnacle)

    this.binnacleService
      .createBinnacle(binnacle, userId)
      .then((data) => res.status(201).json(data))
      .catch((error) => this.handleError(error, res))
  }

  updateBinnacle = (req: Request, res: Response) => {
    const { id } = req.params as { id: string }
    const { userId } = req.body as { userId: string }
    const binnacle = Binnacle.createBinnacle(req.body as IBinnacle)

    this.binnacleService
      .updateBinnacle(id, binnacle, userId)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res))
  }

  deleteBinnacle = (req: Request, res: Response) => {
    const { id } = req.params as { id: string }
    const { userId } = req.body as { userId: string }

    this.binnacleService
      .deleteBinnacle(id, userId)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res))
  }

  assignParent = (req: Request, res: Response) => {
    const { id } = req.params as { id: string }
    const { parents, userId } = req.body as { parents: string[]; userId: string }

    this.binnacleService
      .assignParent(id, parents, userId)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res))
  }

  removeParent = (req: Request, res: Response) => {
    const { id } = req.params as { id: string }
    const { parents, userId } = req.body as { parents: string[]; userId: string }

    this.binnacleService
      .removeParent(id, parents, userId)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res))
  }
}
