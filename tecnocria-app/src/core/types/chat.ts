import { User } from './user'

export interface Message {
  message: string
  category: string
  user: User
  createdAt?: string
  updatedAt?: string
  id: string
}

export interface GlobalMessage {
  message: string
  user: User
  createdAt?: string
  updatedAt?: string
  id: string
}

export interface HugBuddyMessage {
  message: string
  user: User
  isFromHugBuddy: boolean
  createdAt?: string
  updatedAt?: string
  id: string
}
