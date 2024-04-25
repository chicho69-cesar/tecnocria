/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react'

import { CustomError } from '@/core'
import { setSession, signIn } from '../services'
import { useAuth } from './use-auth'

interface SignInErrors {
  email: string | null
  password: string | null
}

export function useSignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<SignInErrors>({
    email: null,
    password: null
  })
  const { authenticate } = useAuth()

  const handleSignIn = async () => {
    try {
      setIsLoading(true)
      setErrors({ email: null, password: null })

      const data = await signIn(email, password)

      await setSession(data)
      authenticate(data.user, data.token)
    } catch (error) {
      if (error instanceof CustomError) {
        if (error.statusCode === 400 && error.message === 'Invalid email') {
          setErrors({ password: null, email: 'Correo electrónico inválido' })
        } else {
          setErrors({
            email: 'El correo electrónico es requerido',
            password: 'La contraseña es requerida'
          })
        }

        if (error.statusCode === 401 || error.statusCode === 404) {
          setErrors({
            email: 'Correo o contraseña incorrectos',
            password: 'Correo o contraseña incorrectos'
          })
        }

        if (error.statusCode === 500) {
          alert('Ocurrió un error inesperado')
        }
      } else {
        alert('Ocurrió un error inesperado')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    errors,
    handleSignIn
  }
}
