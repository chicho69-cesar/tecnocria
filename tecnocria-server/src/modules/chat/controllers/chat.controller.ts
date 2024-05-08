import type { Request, Response } from 'express'
import { CustomError } from '../../../core/errors'
import { ChatService } from '../services'

export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message })
    }

    return res.status(500).json({ error: 'Internal Server Error' })
  }

  getMessagesForConversation = (req: Request, res: Response) => {
    const { category } = req.params as { category: string }

    this.chatService
      .getMessagesForConversation(category)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res))
  }

  getGlobalMessages = (req: Request, res: Response) => {
    this.chatService
      .getGlobalMessages()
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res))
  }

  getHugBuddyMessages = (req: Request, res: Response) => {
    this.chatService
      .getHugBuddyMessages()
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res))
  }

  createHugBuddyMessageAPI = (req: Request, res: Response) => {
    const { userId, message } = req.body as { userId: string; message: string }

    this.chatService
      .createHugBuddyMessage(message, userId)
      .then((data) => res.status(201).json(data))
      .catch((error) => this.handleError(error, res))
  }

  createMessage = async (message: string, category: string, userId: string) => {
    try {
      const newMessage = await this.chatService.createMessage(message, category, userId)
      return newMessage
    } catch (error) {
      throw error
    }
  }

  createGlobalMessage = async (message: string, userId: string) => {
    try {
      const newMessage = await this.chatService.createGlobalMessage(message, userId)
      return newMessage
    } catch (error) {
      throw error
    }
  }

  createHugBuddyMessage = async (message: string, userId: string) => {
    try {
      const [newMessage, newHugBuddyMessage] = await this.chatService.createHugBuddyMessage(message, userId)
      return [newMessage, newHugBuddyMessage]
    } catch (error) {
      throw error
    }
  }
}
