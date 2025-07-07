import { User } from '@/core/types'
import { create } from 'zustand'

interface AuthStore {
  user: User | null
  token: string | null
  isLogged: boolean
}

interface AuthStoreActions {
  authenticate: (user: User, token: string) => void
  updateAuthInfo: (user: User) => void
  logout: () => void
}

type State = AuthStore & AuthStoreActions

export const useAuthStore = create<State>(set => ({
  isLogged: false,
  user: null,
  token: null,
  authenticate: (user, token) => {
    set(() => ({ user, token, isLogged: true }))
  },
  updateAuthInfo: user => {
    set(() => ({ user }))
  },
  logout: () => {
    set(() => ({ user: null, token: null, isLogged: false }))
  }
}))
