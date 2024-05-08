export interface IChat {
  id: string
  message: string
  category: string
  user: string
  repliedTo?: string
}

export interface IGlobalChat {
  id: string
  message: string
  user: string
  repliedTo?: string
}

export interface IHugBuddyChat {
  id: string
  message: string
  user: string
  isFromHugBuddy: boolean
}
