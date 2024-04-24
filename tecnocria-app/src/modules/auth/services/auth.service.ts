import axios from 'axios'

import { envs } from '@/config'
import { Auth, CustomError, User } from '@/core'

export async function signUp(user: User) {
  try {
    const { data } = await axios.post<Auth>(
      `${envs.SERVER_URL}/auth/sign-up`,
      user
    )

    return data
  } catch (error) {
    console.log(`Error en el servicio: ${error}`)
    throw CustomError.internalServer('Internal Server Error')
  }
}

export async function signIn(email: string, password: string) {
  try {
    const { data } = await axios.post<Auth>(`${envs.SERVER_URL}/auth/sign-in`, {
      email,
      password
    })

    return data
  } catch (error) {
    console.log(`Error en el servicio: ${error}`)
    throw CustomError.internalServer('Internal Server Error')
  }
}

export async function signOut(token: string) {
  try {
    const { status } = await axios.post(
      `${envs.SERVER_URL}/auth/sign-out`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    if (status === 401) {
      throw CustomError.unauthorized('Unauthorized')
    }
  } catch (error) {
    console.log(`Error en el servicio: ${error}`)

    if (error instanceof CustomError && error.statusCode === 401) {
      throw CustomError.unauthorized('Unauthorized')
    }

    throw CustomError.internalServer('Internal Server Error')
  }
}

export async function auth(token: string) {
  try {
    const { data, status } = await axios.post<{ user: User }>(
      `${envs.SERVER_URL}/auth`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    if (status === 401) {
      throw CustomError.unauthorized('Unauthorized')
    }

    return data
  } catch (error) {
    console.log(`Error en el servicio: ${error}`)

    if (error instanceof CustomError && error.statusCode === 401) {
      throw CustomError.unauthorized('Unauthorized')
    }

    throw CustomError.internalServer('Internal Server Error')
  }
}
