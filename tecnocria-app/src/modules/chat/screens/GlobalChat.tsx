import { MaterialIcons } from '@expo/vector-icons'
import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import {
  Bubble,
  GiftedChat,
  Send,
  type IMessage
} from 'react-native-gifted-chat'

import { colors } from '@/config'
import { useSocketManager } from '@/core'
import { Spinner } from '@/core/ui'
import { useAuth } from '@/modules/auth'
import { useGlobalMessages } from '../hooks'

const blankImage = require('../../../../assets/img/no-image.jpg')

export default function GlobalChat() {
  const { room, joinRoom, leaveRoom, sendMessage } = useSocketManager()
  const { user } = useAuth()
  const { conversation, isLoading } = useGlobalMessages()
  const [messages, setMessages] = useState<IMessage[]>([])

  useEffect(() => {
    joinRoom('global')

    return () => {
      leaveRoom('global')
    }
  }, [joinRoom, leaveRoom])

  useLayoutEffect(() => {
    const messagesReceived: IMessage[] = conversation
      .filter(msg => msg.user.id !== user?.id)
      .map(msg => ({
        _id: msg.id,
        text: msg.message,
        createdAt: new Date(msg.createdAt ?? new Date()),
        user: {
          _id: 2,
          name: `${msg.user.name} ${msg.user.lastName}`,
          avatar: msg.user.image ?? blankImage
        }
      }))

    const messagesSent: IMessage[] = conversation
      .filter(msg => msg.user.id === user?.id)
      .map(msg => ({
        _id: msg.id,
        text: msg.message,
        createdAt: new Date(msg.createdAt ?? new Date()),
        user: {
          _id: 1,
          name: `${user?.name} ${user?.lastName}`,
          avatar: user?.image ?? blankImage
        }
      }))

    const messagesOfTheConversation = [...messagesReceived, ...messagesSent]

    messagesOfTheConversation.sort((a, b) => {
      const dateA =
        a.createdAt instanceof Date ? a.createdAt : new Date(a.createdAt)
      const dateB =
        b.createdAt instanceof Date ? b.createdAt : new Date(b.createdAt)

      return dateB.getTime() - dateA.getTime()
    })

    setMessages(messagesOfTheConversation)
  }, [conversation, user])

  const handleSendMessage = useCallback(
    (messages: IMessage[] = []) => {
      if (room) {
        sendMessage(messages[0].text, 'GlobalMessage')
      }

      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, messages)
      )
    },
    [room, sendMessage]
  )

  if (isLoading) {
    return <Spinner text='Cargando' />
  }

  return (
    <GiftedChat
      messages={messages}
      placeholder='Escribe un mensaje...'
      messagesContainerStyle={styles.messageStyle}
      onSend={messages => {
        handleSendMessage(messages)
      }}
      user={{
        _id: 1,
        avatar: user?.image ?? blankImage
      }}
      renderSend={props => (
        <Send
          {...props}
          containerStyle={{
            height: 60,
            width: 60,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <MaterialIcons name='send' size={24} color={colors.primary} />
        </Send>
      )}
      renderBubble={props => (
        <Bubble
          {...props}
          wrapperStyle={{
            right: {
              backgroundColor: colors.primary
            }
          }}
        />
      )}
    />
  )
}

const styles = StyleSheet.create({
  messageStyle: {
    backgroundColor: colors.background
  }
})
