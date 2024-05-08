import { IBinnacle } from '../interfaces'

export class Binnacle {
  public name: string
  public description: string
  public progress: number

  constructor(name: string, description: string, progress: number) {
    this.name = name
    this.description = description
    this.progress = progress
  }

  static createBinnacle(body: IBinnacle): Binnacle {
    const { name, description, progress } = body
    return new Binnacle(name, description, progress)
  }
}
