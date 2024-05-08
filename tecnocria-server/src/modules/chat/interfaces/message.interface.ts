export interface IMessage {
  room: string | null
  message: string
  messageType: 'Message' | 'GlobalMessage' | 'HugBuddyMessage'
}
