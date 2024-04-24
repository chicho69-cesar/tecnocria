import { IAuth } from '../interfaces'

export class Auth {
  public name: string
  public lastName: string
  public username: string
  public email: string
  public password: string
  public image?: string
  public role: string

  constructor(name: string, lastName: string, username: string, email: string, password: string, role: string, image?: string) {
    this.name = name
    this.lastName = lastName
    this.username = username
    this.email = email
    this.password = password
    this.image = image
    this.role = role
  }

  static createAuth(body: IAuth): Auth {
    const { name, lastName, username, email, password, role } = body
    return new Auth(name, lastName, username, email, password, role)
  }
}
