import { useAuth } from '@/modules/auth'
import { useState } from 'react'
import { patchUserInfo } from '../services/users.service'

export function useConfig() {
  const [loading, setLoading] = useState(false)
  const { token, updateAuthInfo } = useAuth()

  async function updateInfo(name: string, lastName: string) {
    setLoading(true)

    try {
      const data = await patchUserInfo(name, lastName, token!)
      updateAuthInfo(data)
    } catch (error) {
      console.log(`Error en el hook use config: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    updateInfo
  }
}
