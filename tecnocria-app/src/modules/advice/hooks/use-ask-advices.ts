import { useAuth } from '@/modules/auth'
import { useState } from 'react'
import { giveMeAdvices } from '../services'

export function useAskAdvices() {
  const [advices, setAdvices] = useState<{ data: string } | null>(null)
  const [loading, setLoading] = useState(false)
  const { token } = useAuth()

  async function askAdvices(message: string) {
    setLoading(true)

    try {
      const data = await giveMeAdvices(message, token!)
      setAdvices(data)
    } catch (error) {
      console.log(`Error en el hook use ask advices: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  return {
    advices,
    loading,
    askAdvices
  }
}
