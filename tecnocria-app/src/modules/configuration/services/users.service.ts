import axios, { AxiosError } from 'axios'
import * as FileSystem from 'expo-file-system'

import { envs } from '@/config'
import { CustomError, User } from '@/core'

export async function patchUserInfo(
  name: string,
  lastName: string,
  token: string
) {
  try {
    const { data, status } = await axios.patch<User>(
      `${envs.SERVER_URL}/users/edit`,
      {
        name,
        lastName
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
    console.log(`Error en el servicio patch user: ${error}`)

    if (error instanceof AxiosError) {
      const { response } = error
      throw new CustomError(response!.status, response!.data.error)
    }

    throw CustomError.internalServer('Internal Server Error')
  }
}

export async function uploadProfileImage(uri: string, token: string) {
  try {
    const response = await FileSystem.uploadAsync(
      `${envs.SERVER_URL}/users/upload`,
      uri,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        },
        fieldName: 'image',
        httpMethod: 'POST',
        uploadType: FileSystem.FileSystemUploadType.MULTIPART
      }
    )

    const jsonResponse = JSON.parse(response.body)
    const data = jsonResponse as User

    return data
  } catch (error) {
    console.log(`Error en el servicio upload profile image: ${error}`)

    if (error instanceof AxiosError) {
      const { response } = error
      throw new CustomError(response!.status, response!.data.error)
    }

    throw CustomError.internalServer('Internal Server Error')
  }
}
