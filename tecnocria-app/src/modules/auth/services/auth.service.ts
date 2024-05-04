import axios, { AxiosError } from 'axios'

import { envs } from '@/config'
import { Auth, CustomError, User } from '@/core'

export async function signUp(
  name: string,
  lastName: string,
  email: string,
  password: string,
  username: string,
  role: string
) {
  try {
    const { data } = await axios.post<Auth>(`${envs.SERVER_URL}/auth/sign-up`, {
      name,
      lastName,
      email,
      password,
      username,
      role
    })

    return data
  } catch (error) {
    console.log(`Error en el servicio sign-up: ${error}`)

    if (error instanceof AxiosError) {
      const { response } = error
      console.log(response!.data.error)
      throw new CustomError(response!.status, response!.data.error)
    }

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
    console.log(`Error en el servicio sign-in: ${error}`)

    if (error instanceof AxiosError) {
      const { response } = error
      throw new CustomError(response!.status, response!.data.error)
    }

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
    console.log(`Error en el servicio sign out: ${error}`)

    if (error instanceof AxiosError) {
      const { response } = error
      throw new CustomError(response!.status, response!.data.error)
    }

    throw CustomError.internalServer('Internal Server Error')
  }
}

export async function auth(token: string) {
  try {
    const { data, status } = await axios.get<{ user: User }>(
      `${envs.SERVER_URL}/auth`,
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
    console.log(`Error en el servicio auth: ${error}`)

    if (error instanceof AxiosError) {
      const { response } = error
      throw new CustomError(response!.status, response!.data.error)
    }

    throw CustomError.internalServer('Internal Server Error')
  }
}
