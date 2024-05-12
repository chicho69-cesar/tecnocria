import { useAuth } from '@/modules/auth'
import { useEffect, useState } from 'react'
import { getAdvices } from '../services'

export function useAdvices(title: string) {
  const { token } = useAuth()
  const [advices, setAdvices] = useState<{ data: string }>({ data: '' })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchAdvices(title, token!)
  }, [title, token])

  async function fetchAdvices(title: string, token: string) {
    setLoading(true)

    try {
      const data = await getAdvices(title, token!)
      setAdvices(data)
    } catch (error) {
      console.log(`Error en el hook use advices: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  return {
    advices,
    loading,
    fetchAdvices
  }
}
