import axios, { AxiosError } from 'axios'

import { envs } from '@/config'
import { CustomError } from '@/core/errors'
import { GlobalMessage, HugBuddyMessage, Message } from '@/core/types'

export async function getMessages(category: string, token: string) {
  try {
    const { data, status } = await axios.get<Message[]>(
      `${envs.SERVER_URL}/chats/by/${category}`,
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
    console.log(`Error en el servicio get messages: ${error}`)

    if (error instanceof AxiosError) {
      const { response } = error
      throw new CustomError(response!.status, response!.data.error)
    }

    throw CustomError.internalServer('Internal Server Error')
  }
}

export async function getGlobalMessages(token: string) {
  try {
    const { data, status } = await axios.get<GlobalMessage[]>(
      `${envs.SERVER_URL}/chats/global`,
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
    console.log(`Error en el servicio get global messages: ${error}`)

    if (error instanceof AxiosError) {
      const { response } = error
      throw new CustomError(response!.status, response!.data.error)
    }

    throw CustomError.internalServer('Internal Server Error')
  }
}

export async function getHugBuddyMessages(token: string) {
  try {
    const { data, status } = await axios.get<HugBuddyMessage[]>(
      `${envs.SERVER_URL}/chats/hug-buddy`,
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
    console.log(`Error en el servicio get hug buddy messages: ${error}`)

    if (error instanceof AxiosError) {
      const { response } = error
      throw new CustomError(response!.status, response!.data.error)
    }

    throw CustomError.internalServer('Internal Server Error')
  }
}
