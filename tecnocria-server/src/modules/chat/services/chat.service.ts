import { openai } from '../../../core'
import { GlobalMessageModel, HugBuddyMessageModel, MessageModel } from '../../../data/mongodb'

export class ChatService {
  constructor() {}

  getMessagesForConversation = async (category: string) => {
    try {
      // TODO: Sort by createdAt
      const messages = await MessageModel.find({ category }).populate('user', 'name lastName username email role image')
      return messages
    } catch (error) {
      throw error
    }
  }

  getGlobalMessages = async () => {
    try {
      // TODO: Sort by createdAt
      const messages = await GlobalMessageModel.find().populate('user', 'name lastName username email role image')
      return messages
    } catch (error) {
      throw error
    }
  }

  getHugBuddyMessages = async () => {
    try {
      // TODO: Sort by createdAt
      const messages = await HugBuddyMessageModel.find().populate('user', 'name lastName username email role image')
      return messages
    } catch (error) {
      throw error
    }
  }

  createMessage = async (message: string, category: string, userId: string) => {
    try {
      const newMessage = new MessageModel({ message, category, user: userId })

      await newMessage.save()
      await newMessage.populate('user', 'name lastName username email role image')

      return newMessage
    } catch (error) {
      throw error
    }
  }

  createGlobalMessage = async (message: string, userId: string) => {
    try {
      const newMessage = new GlobalMessageModel({ message, user: userId })

      await newMessage.save()
      await newMessage.populate('user', 'name lastName username email role image')

      return newMessage
    } catch (error) {
      throw error
    }
  }

  createHugBuddyMessage = async (message: string, userId: string) => {
    try {
      const newMessage = new HugBuddyMessageModel({ message, user: userId, isFromHugBuddy: false })

      await newMessage.save()
      await newMessage.populate('user', 'name lastName username email role image')

      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        temperature: 0.5,
        messages: [
          {
            role: 'user',
            content:
              'Hola, eres un chat que ayuda a las personas con recomendaciones para apoyarlos en la crianza y la educación de sus hijos, debes de contestar los siguientes mensajes tomando esto en cuenta y en base al mensaje siguiente que te envié.'
          },
          { role: 'user', content: message }
        ]
      })

      const hugBuddyMessage = completion.choices[0]?.message?.content
      const newHugBuddyMessage = new HugBuddyMessageModel({ message: hugBuddyMessage, user: userId, isFromHugBuddy: true })

      await newHugBuddyMessage.save()
      await newHugBuddyMessage.populate('user', 'name lastName username email role image')

      return [newMessage, newHugBuddyMessage]
    } catch (error) {
      throw error
    }
  }
}
