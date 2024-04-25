import { CustomError, Roles } from '@/core'
import { useState } from 'react'
import { setSession, signUp } from '../services'
import { useAuth } from './use-auth'

interface SignUpErrors {
  name: string | null
  lastName: string | null
  username: string | null
  email: string | null
  password: string | null
  confirmPassword: string | null
}

const INITIAL_ERRORS: SignUpErrors = {
  name: null,
  lastName: null,
  username: null,
  email: null,
  password: null,
  confirmPassword: null
}

export function useSignUp() {
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<SignUpErrors>(INITIAL_ERRORS)
  const { authenticate } = useAuth()

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setErrors({
        ...INITIAL_ERRORS,
        confirmPassword: 'Las contraseñas no coinciden'
      })
      return
    }

    try {
      setIsLoading(true)
      setErrors(INITIAL_ERRORS)

      const data = await signUp(
        name,
        lastName,
        email,
        password,
        username,
        Roles.user
      )

      await setSession(data)
      authenticate(data.user, data.token)
    } catch (error) {
      if (error instanceof CustomError) {
        if (error.statusCode === 400 && error.message === 'Invalid email') {
          setErrors({ ...INITIAL_ERRORS, email: 'Correo electrónico inválido' })
        } else if (
          error.statusCode === 400 &&
          error.message === 'User already exists'
        ) {
          setErrors({
            ...INITIAL_ERRORS,
            username:
              'El nombre de usuario o el correo electrónico ya están en uso',
            email:
              'El nombre de usuario o el correo electrónico ya están en uso'
          })
        } else {
          setErrors({
            name: 'El nombre es requerido',
            lastName: 'Los apellidos son requeridos',
            username: 'El nombre de usuario es requerido',
            email: 'El correo electrónico es requerido',
            password: 'La contraseña es requerida',
            confirmPassword: 'La confirmación de contraseña es requerida'
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
    name,
    setName,
    lastName,
    setLastName,
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    isLoading,
    errors,
    handleSignUp
  }
}
