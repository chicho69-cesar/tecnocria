import { useAuthStore } from '../store'

export function useAuth() {
  const isLogged = useAuthStore(state => state.isLogged)
  const user = useAuthStore(state => state.user)
  const token = useAuthStore(state => state.token)
  const authenticate = useAuthStore(state => state.authenticate)
  const updateAuthInfo = useAuthStore(state => state.updateAuthInfo)
  const logout = useAuthStore(state => state.logout)

  return { isLogged, user, token, authenticate, updateAuthInfo, logout }
}
