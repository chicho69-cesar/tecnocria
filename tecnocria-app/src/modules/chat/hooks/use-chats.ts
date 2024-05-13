import { useChatStore } from '../store'

export function useChats() {
  const messages = useChatStore(state => state.messages)
  const globalMessages = useChatStore(state => state.globalMessages)
  const hugBuddyMessages = useChatStore(state => state.hugBuddyMessages)
  const addMessage = useChatStore(state => state.addMessage)
  const addGlobalMessage = useChatStore(state => state.addGlobalMessage)
  const addHugBuddyMessage = useChatStore(state => state.addHugBuddyMessage)
  const setMessages = useChatStore(state => state.setMessages)
  const setGlobalMessages = useChatStore(state => state.setGlobalMessages)
  const setHugBuddyMessages = useChatStore(state => state.setHugBuddyMessages)

  return {
    messages,
    globalMessages,
    hugBuddyMessages,
    addMessage,
    addGlobalMessage,
    addHugBuddyMessage,
    setMessages,
    setGlobalMessages,
    setHugBuddyMessages
  }
}
