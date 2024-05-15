import { createContext, useEffect, useState } from 'react'
import { envs } from '@/config'
import { useAuth } from '@/modules/auth'
import { useSocket } from '../hooks'
import { useChats } from '@/modules/chat'

interface SocketContextProps {
  socket: any
  connected: boolean
  room: string | null

  joinRoom: (room: string) => void
  leaveRoom: (room: string) => void
  sendMessage: (message: string, messageType: string) => void
}

export const SocketContext = createContext({} as SocketContextProps)

interface SocketProviderProps {
  children: React.ReactNode | React.ReactNode[] | JSX.Element | JSX.Element[]
}

export function SocketProvider({ children }: SocketProviderProps) {
  const { socket, connected, connectSocket, disconnectSocket } = useSocket(
    envs.SOCKET_URL
  )
  const { isLogged } = useAuth()
  const { addMessage, addGlobalMessage, addHugBuddyMessage } = useChats()
  const [room, setRoom] = useState<string | null>(null)

  useEffect(() => {
    if (isLogged) {
      connectSocket()
    }
  }, [isLogged, connectSocket])

  useEffect(() => {
    if (!isLogged) {
      disconnectSocket()
    }
  }, [isLogged, disconnectSocket])

  useEffect(() => {
    socket?.on('newMessage', message => {
      addMessage(message)
      console.log('New message', message)
    })
  }, [addMessage, socket])

  useEffect(() => {
    socket?.on('newGlobalMessage', message => {
      addGlobalMessage(message)
      console.log('New global message', message)
    })
  }, [addGlobalMessage, socket])

  useEffect(() => {
    socket?.on('newHugBuddyMessage', message => {
      addHugBuddyMessage(message)
      console.log('New hug buddy message', message)
    })
  }, [addHugBuddyMessage, socket])

  const joinRoom = (roomToJoin: string) => {
    setRoom(roomToJoin)
    socket?.emit('joinRoom', roomToJoin)
  }

  const leaveRoom = (roomToLeave: string) => {
    setRoom(null)
    socket?.emit('leaveRoom', roomToLeave)
  }

  const sendMessage = (message: string, messageType: string) => {
    socket?.emit('sendMessage', { message, room, messageType })
  }

  return (
    <SocketContext.Provider
      value={{
        // VALUES
        socket,
        connected,
        room,

        // METHODS
        joinRoom,
        leaveRoom,
        sendMessage
      }}>
      {children}
    </SocketContext.Provider>
  )
}
