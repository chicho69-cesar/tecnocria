import { IUser } from '../interfaces'

export class User {
  public name: string
  public lastName: string

  constructor(name: string, lastName: string) {
    this.name = name
    this.lastName = lastName
  }

  static create(data: IUser): User {
    return new User(data.name, data.lastName)
  }
}
