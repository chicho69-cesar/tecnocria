export class AuthToken {
  public token: string
  public user: string

  constructor(token: string, user: string) {
    this.token = token
    this.user = user
  }

  static createAuthToken(token: string, user: string): AuthToken {
    return new AuthToken(token, user)
  }
}
