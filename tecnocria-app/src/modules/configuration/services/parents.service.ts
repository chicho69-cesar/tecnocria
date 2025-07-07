import axios, { AxiosError } from 'axios'
import * as FileSystem from 'expo-file-system'

import { envs } from '@/config'
import { CustomError } from '@/core/errors'
import { Parent } from '@/core/types'

export async function getParents(token: string) {
  try {
    const { data, status } = await axios.get<Parent[]>(
      `${envs.SERVER_URL}/parents`,
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
    console.log(`Error en el servicio get parents: ${error}`)

    if (error instanceof AxiosError) {
      const { response } = error
      throw new CustomError(response!.status, response!.data.error)
    }

    throw CustomError.internalServer('Internal Server Error')
  }
}

export async function getParent(id: string, token: string) {
  try {
    const { data, status } = await axios.get<Parent>(
      `${envs.SERVER_URL}/parents/${id}`,
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
    console.log(`Error en el servicio get parent: ${error}`)

    if (error instanceof AxiosError) {
      const { response } = error
      throw new CustomError(response!.status, response!.data.error)
    }

    throw CustomError.internalServer('Internal Server Error')
  }
}

export async function postParent(
  name: string,
  lastName: string,
  relationship: string,
  age: number,
  token: string
) {
  try {
    const { data, status } = await axios.post<Parent>(
      `${envs.SERVER_URL}/parents`,
      {
        name,
        lastName,
        relationship,
        age
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
    console.log(`Error en el servicio post parents: ${error}`)

    if (error instanceof AxiosError) {
      const { response } = error
      throw new CustomError(response!.status, response!.data.error)
    }

    throw CustomError.internalServer('Internal Server Error')
  }
}

export async function putParent(
  id: string,
  name: string,
  lastName: string,
  relationship: string,
  age: number,
  token: string
) {
  try {
    const { data, status } = await axios.put<Parent>(
      `${envs.SERVER_URL}/parents/${id}`,
      {
        name,
        lastName,
        relationship,
        age
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
    console.log(`Error en el servicio put parents: ${error}`)

    if (error instanceof AxiosError) {
      const { response } = error
      throw new CustomError(response!.status, response!.data.error)
    }

    throw CustomError.internalServer('Internal Server Error')
  }
}

export async function deleteParent(id: string, token: string) {
  try {
    const { data, status } = await axios.delete<{ message: string }>(
      `${envs.SERVER_URL}/parents/${id}`,
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
    console.log(`Error en el servicio delete parent: ${error}`)

    if (error instanceof AxiosError) {
      const { response } = error
      throw new CustomError(response!.status, response!.data.error)
    }

    throw CustomError.internalServer('Internal Server Error')
  }
}

export async function uploadParentImage(
  id: string,
  uri: string,
  token: string
) {
  try {
    const response = await FileSystem.uploadAsync(
      `${envs.SERVER_URL}/parents/upload/${id}`,
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
    const data = jsonResponse as Parent

    return data
  } catch (error) {
    console.log(`Error en el servicio upload parent image: ${error}`)

    if (error instanceof AxiosError) {
      const { response } = error
      throw new CustomError(response!.status, response!.data.error)
    }

    throw CustomError.internalServer('Internal Server Error')
  }
}
