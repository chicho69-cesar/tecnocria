import { create } from 'zustand'

interface ChatStore {
  messages: any[]
  globalMessages: any[]
  hugBuddyMessages: any[]
}

interface ChatStoreActions {
  addMessage: (message: any) => void
  addGlobalMessage: (message: any) => void
  addHugBuddyMessage: (message: any) => void

  setMessages: (messages: any[]) => void
  setGlobalMessages: (messages: any[]) => void
  setHugBuddyMessages: (messages: any[]) => void
}

type State = ChatStore & ChatStoreActions

export const useChatStore = create<State>(set => ({
  messages: [],
  globalMessages: [],
  hugBuddyMessages: [],

  addMessage: message =>
    set(state => ({ messages: [...state.messages, message] })),
  addGlobalMessage: message =>
    set(state => ({ globalMessages: [...state.globalMessages, message] })),
  addHugBuddyMessage: message =>
    set(state => ({ hugBuddyMessages: [...state.hugBuddyMessages, message] })),

  setMessages: messages => set({ messages }),
  setGlobalMessages: messages => set({ globalMessages: messages }),
  setHugBuddyMessages: messages => set({ hugBuddyMessages: messages })
}))
