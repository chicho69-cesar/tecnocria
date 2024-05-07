import type { Request, Response } from 'express'
import { CustomError } from '../../../core/errors'
import { AIService } from '../services'

export class AIController {
  constructor(private readonly aiService: AIService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message })
    }

    return res.status(500).json({ error: 'Internal Server Error' })
  }

  testAI = (req: Request, res: Response) => {
    this.aiService
      .testAI()
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res))
  }
}
