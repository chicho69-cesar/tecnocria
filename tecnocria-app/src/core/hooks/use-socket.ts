import { useCallback, useContext, useEffect, useState } from 'react'
import { Socket, io } from 'socket.io-client'

import { useAuth } from '@/modules/auth'
import { SocketContext } from '../context'

export function useSocket(serverPath: string) {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [connected, setConnected] = useState(false)
  const { token } = useAuth()

  const connectSocket = useCallback(() => {
    const socketTemp = io(serverPath, {
      transports: ['websocket'],
      autoConnect: true,
      forceNew: true,
      auth: {
        token
      },
      query: {
        'access-token': token
      }
    })

    setSocket(socketTemp)
  }, [serverPath, token])

  const disconnectSocket = useCallback(() => {
    socket?.disconnect()
  }, [socket])

  useEffect(() => {
    setConnected(socket?.connected ?? false)
  }, [socket])

  useEffect(() => {
    socket?.on('connect', () => setConnected(true))
  }, [socket])

  useEffect(() => {
    socket?.on('disconnect', () => setConnected(false))
  }, [socket])

  return {
    socket,
    connected,
    connectSocket,
    disconnectSocket
  }
}

export function useSocketManager() {
  return useContext(SocketContext)
}
