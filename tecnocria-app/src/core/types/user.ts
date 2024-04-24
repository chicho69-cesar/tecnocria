export interface Auth {
  token: string
  user: User
}

export interface User {
  id: string
  name: string
  lastName: string
  username: string
  email: string
  image?: string
  role: 'PROFESIONAL' | 'USER'
}
