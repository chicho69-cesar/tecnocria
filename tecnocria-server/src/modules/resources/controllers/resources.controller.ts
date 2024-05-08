import type { Request, Response } from 'express'
import { CustomError } from '../../../core/errors'
import { ResourcesService } from '../services'

export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message })
    }

    return res.status(500).json({ error: 'Internal Server Error' })
  }

  getBooksRecommendations = (req: Request, res: Response) => {
    this.resourcesService
      .getBooksRecommendations()
      .then((data) => res.json({ data }))
      .catch((error) => this.handleError(error, res))
  }

  getAudiovisualRecommendations = (req: Request, res: Response) => {
    this.resourcesService
      .getAudiovisualRecommendations()
      .then((data) => res.json({ data }))
      .catch((error) => this.handleError(error, res))
  }
}
