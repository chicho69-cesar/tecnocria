import { User } from './user'

export interface Parent {
  name: string
  lastName: string
  relationship: string
  age: number
  user: User
  image?: string
  createdAt?: Date
  updatedAt?: Date
  id: string
}
