import { Socket, Server as SocketServer } from 'socket.io'
import { JWT } from '../config'
import { TokenModel } from '../data/mongodb'
import { ChatController, ChatService } from '../modules/chat'
import { IMessage } from '../modules/chat/interfaces'

export class SocketManager {
  private readonly io: SocketServer
  private readonly chatController: ChatController

  public constructor(io: SocketServer) {
    this.io = io

    const service = new ChatService()
    this.chatController = new ChatController(service)
  }

  public socketEvents(): void {
    this.io.on('connection', async (socket: Socket) => {
      console.log('Socket connected', socket.id)

      // const token = socket.handshake.query['access-token'] as string
      const { token } = socket.handshake.auth as { token: string | undefined }
      console.log('Token', token)

      if (!token) {
        return socket.disconnect()
      }

      const validToken = await JWT.validateToken<{ id: string }>(token)

      if (!validToken) {
        const tokenExists = await TokenModel.findOne({ token })

        if (tokenExists) {
          await TokenModel.deleteOne({ token })
        }

        return socket.disconnect()
      }

      socket.on('joinRoom', (room: string) => {
        socket.join(room)
        console.log('Joined room', room)
      })

      socket.on('leaveRoom', (room: string) => {
        socket.leave(room)
        console.log('Left room', room)
      })

      socket.on('sendMessage', async (data: IMessage) => {
        const { message, room, messageType } = data

        switch (messageType) {
          case 'Message': {
            if (!room) {
              return
            }

            const newMessage = await this.chatController.createMessage(message, room, validToken.id)
            this.io.to(room).emit('newMessage', newMessage)

            break
          }

          case 'GlobalMessage': {
            const newGlobalMessage = await this.chatController.createGlobalMessage(message, validToken.id)
            this.io.to('global').emit('newGlobalMessage', newGlobalMessage)

            break
          }

          case 'HugBuddyMessage': {
            const [newMessage, newHugBuddyMessage] = await this.chatController.createHugBuddyMessage(message, validToken.id)
            socket.emit('newHugBuddyMessage', newMessage)
            socket.emit('newHugBuddyMessage', newHugBuddyMessage)

            //

            break
          }

          default:
            break
        }
      })

      socket.on('disconnect', async () => {
        console.log('Socket disconnected', socket.id)
      })
    })
  }
}
