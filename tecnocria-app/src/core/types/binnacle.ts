import { Parent } from './parents'
import { User } from './user'

export interface Binnacle {
  name: string
  description: string
  progress: number
  parents: Parent[]
  user: User
  createdAt?: Date
  updatedAt?: Date
  id: string
}
