import axios, { AxiosError } from 'axios'

import { envs } from '@/config'
import { CustomError } from '@/core/errors'

export async function getAdvices(title: string, token: string) {
  try {
    const { data, status } = await axios.post<{ data: string }>(
      `${envs.SERVER_URL}/advices`,
      {
        title
      },
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
    console.log(`Error en el servicio get advices: ${error}`)

    if (error instanceof AxiosError) {
      const { response } = error
      throw new CustomError(response!.status, response!.data.error)
    }

    throw CustomError.internalServer('Internal Server Error')
  }
}

export async function giveMeAdvices(message: string, token: string) {
  try {
    const { data, status } = await axios.post<{ data: string }>(
      `${envs.SERVER_URL}/advices/give-me`,
      {
        message
      },
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
    console.log(`Error en el servicio give me advices: ${error}`)

    if (error instanceof AxiosError) {
      const { response } = error
      throw new CustomError(response!.status, response!.data.error)
    }

    throw CustomError.internalServer('Internal Server Error')
  }
}
