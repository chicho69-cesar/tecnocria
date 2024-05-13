import { useAuth } from '@/modules/auth'
import { useState } from 'react'
import { getAudiovisualAI, getBooksAI } from '../services'

export function useResources() {
  const { token } = useAuth()
  const [books, setBooks] = useState<{ data: string }>({ data: '' })
  const [audiovisual, setAudiovisual] = useState<{ data: string }>({ data: '' })
  const [loading, setLoading] = useState(false)

  async function fetchBooks() {
    setLoading(true)

    try {
      const data = await getBooksAI(token!)
      setBooks(data)
    } catch (error) {
      console.log(`Error en el hook use resources: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  async function fetchAudiovisual() {
    setLoading(true)

    try {
      const data = await getAudiovisualAI(token!)
      setAudiovisual(data)
    } catch (error) {
      console.log(`Error en el hook use resources: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  return {
    books,
    audiovisual,
    loading,
    fetchBooks,
    fetchAudiovisual
  }
}
