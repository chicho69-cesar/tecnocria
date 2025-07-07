import { useEffect, useState } from 'react'

import { CustomError } from '@/core/errors'
import { GlobalMessage, HugBuddyMessage, Message } from '@/core/types'
import { useAuth } from '@/modules/auth'
import {
  getGlobalMessages,
  getHugBuddyMessages,
  getMessages
} from '../services'
import { useChats } from './use-chats'

export function useMessages(category: string) {
  const { messages, setMessages } = useChats()
  const [isLoading, setIsLoading] = useState(false)
  const { token } = useAuth()

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setIsLoading(true)
        const messagesFetched = await getMessages(category, token!)
        setMessages(messagesFetched)
      } catch (error) {
        if (error instanceof CustomError) {
          return alert(error.message)
        }

        alert('Error fetching messages')
      } finally {
        setIsLoading(false)
      }
    }

    fetchMessages()
  }, [category, setMessages, token])

  return {
    conversation: messages as Message[],
    isLoading
  }
}

export function useGlobalMessages() {
  const { globalMessages, setGlobalMessages } = useChats()
  const [isLoading, setIsLoading] = useState(false)
  const { token } = useAuth()

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setIsLoading(true)
        const messagesFetched = await getGlobalMessages(token!)
        setGlobalMessages(messagesFetched)
      } catch (error) {
        if (error instanceof CustomError) {
          return alert(error.message)
        }

        alert('Error fetching messages')
      } finally {
        setIsLoading(false)
      }
    }

    fetchMessages()
  }, [setGlobalMessages, token])

  return {
    conversation: globalMessages as GlobalMessage[],
    isLoading
  }
}

export function useHugBuddyMessages() {
  const { hugBuddyMessages, setHugBuddyMessages } = useChats()
  const [isLoading, setIsLoading] = useState(false)
  const { token } = useAuth()

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setIsLoading(true)
        const messagesFetched = await getHugBuddyMessages(token!)
        setHugBuddyMessages(messagesFetched)
      } catch (error) {
        if (error instanceof CustomError) {
          return alert(error.message)
        }

        alert('Error fetching messages')
      } finally {
        setIsLoading(false)
      }
    }

    fetchMessages()
  }, [setHugBuddyMessages, token])

  return {
    conversation: hugBuddyMessages as HugBuddyMessage[],
    isLoading
  }
}
