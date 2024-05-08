import type { Request, Response } from 'express'
import { CustomError } from '../../../core/errors'
import { AdviceService } from '../services'

export class AdviceController {
  constructor(private readonly adviceService: AdviceService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message })
    }

    return res.status(500).json({ error: 'Internal Server Error' })
  }

  getAdvices = (req: Request, res: Response) => {
    const { title } = req.body as { title: string }

    this.adviceService
      .getAdvices(title)
      .then((data) => res.status(200).json({ data }))
      .catch((error) => this.handleError(error, res))
  }

  giveMeAnAdvice = (req: Request, res: Response) => {
    const { message } = req.body as { message: string }

    this.adviceService
      .giveMeAnAdvice(message)
      .then((data) => res.status(200).json({ data }))
      .catch((error) => this.handleError(error, res))
  }
}
