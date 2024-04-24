import type { Request, Response } from 'express'

export class HealthController {
  public constructor() {}

  healthCheck = (req: Request, res: Response) => {
    return res.send('OK')
  }

  getIsHealthy = (req: Request, res: Response) => {
    return res.status(200).json({
      message: 'Server is healthy'
    })
  }
}
