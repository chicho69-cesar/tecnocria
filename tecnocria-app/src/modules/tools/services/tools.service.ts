import axios, { AxiosError } from 'axios'

import { envs } from '@/config'
import { CustomError } from '@/core/errors'

export async function getBooksAI(token: string) {
  try {
    const { data, status } = await axios.get<{ data: string }>(
      `${envs.SERVER_URL}/resources/books`,
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
    console.log(`Error en el servicio get books AI: ${error}`)

    if (error instanceof AxiosError) {
      const { response } = error
      throw new CustomError(response!.status, response!.data.error)
    }

    throw CustomError.internalServer('Internal Server Error')
  }
}

export async function getAudiovisualAI(token: string) {
  try {
    const { data, status } = await axios.get<{ data: string }>(
      `${envs.SERVER_URL}/resources/audiovisual`,
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
    console.log(`Error en el servicio get audiovisual AI: ${error}`)

    if (error instanceof AxiosError) {
      const { response } = error
      throw new CustomError(response!.status, response!.data.error)
    }

    throw CustomError.internalServer('Internal Server Error')
  }
}
