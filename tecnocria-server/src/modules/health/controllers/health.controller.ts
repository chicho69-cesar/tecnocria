import type { Request, Response } from 'express'

export class HealthController {
  public constructor() {}

  public healthCheck(req: Request, res: Response) {
    return res.send('OK')
  }

  public getIsHealthy(req: Request, res: Response) {
    return res.status(200).json({
      message: 'Server is healthy'
    })
  }
}
