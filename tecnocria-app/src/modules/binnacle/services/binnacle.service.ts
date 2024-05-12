import axios, { AxiosError } from 'axios'

import { envs } from '@/config'
import { Binnacle, CustomError } from '@/core'

export async function getBinnacles(token: string) {
  try {
    const { data, status } = await axios.get<Binnacle[]>(
      `${envs.SERVER_URL}/binnacles`,
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
    console.log(`Error en el servicio get binnacles: ${error}`)

    if (error instanceof AxiosError) {
      const { response } = error
      throw new CustomError(response!.status, response!.data.error)
    }

    throw CustomError.internalServer('Internal Server Error')
  }
}

export async function getBinnacle(id: string, token: string) {
  try {
    const { data, status } = await axios.get<Binnacle>(
      `${envs.SERVER_URL}/binnacles/${id}`,
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
    console.log(`Error en el servicio get binnacle: ${error}`)

    if (error instanceof AxiosError) {
      const { response } = error
      throw new CustomError(response!.status, response!.data.error)
    }

    throw CustomError.internalServer('Internal Server Error')
  }
}

export async function postBinnacle(
  name: string,
  description: string,
  progress: number,
  token: string
) {
  try {
    const { data, status } = await axios.post<Binnacle>(
      `${envs.SERVER_URL}/binnacles`,
      {
        name,
        description,
        progress
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
    console.log(`Error en el servicio post binnacle: ${error}`)

    if (error instanceof AxiosError) {
      const { response } = error
      throw new CustomError(response!.status, response!.data.error)
    }

    throw CustomError.internalServer('Internal Server Error')
  }
}

export async function putBinnacle(
  id: string,
  name: string,
  description: string,
  progress: number,
  token: string
) {
  try {
    const { data, status } = await axios.put<Binnacle>(
      `${envs.SERVER_URL}/binnacles/${id}`,
      {
        name,
        description,
        progress
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
    console.log(`Error en el servicio put binnacle: ${error}`)

    if (error instanceof AxiosError) {
      const { response } = error
      throw new CustomError(response!.status, response!.data.error)
    }

    throw CustomError.internalServer('Internal Server Error')
  }
}

export async function deleteBinnacle(id: string, token: string) {
  try {
    const { data, status } = await axios.delete<{ message: string }>(
      `${envs.SERVER_URL}/binnacles/${id}`,
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
    console.log(`Error en el servicio delete binnacle: ${error}`)

    if (error instanceof AxiosError) {
      const { response } = error
      throw new CustomError(response!.status, response!.data.error)
    }

    throw CustomError.internalServer('Internal Server Error')
  }
}

export async function patchAssignParents(
  id: string,
  parents: string[],
  token: string
) {
  try {
    const { data, status } = await axios.patch<Binnacle>(
      `${envs.SERVER_URL}/binnacles/assign/${id}`,
      {
        parents
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
    console.log(`Error en el servicio patch assign parents: ${error}`)

    if (error instanceof AxiosError) {
      const { response } = error
      throw new CustomError(response!.status, response!.data.error)
    }

    throw CustomError.internalServer('Internal Server Error')
  }
}

export async function patchRemoveParents(
  id: string,
  parents: string[],
  token: string
) {
  try {
    const { data, status } = await axios.patch<Binnacle>(
      `${envs.SERVER_URL}/binnacles/remove/${id}`,
      {
        parents
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
    console.log(`Error en el servicio patch remove parents: ${error}`)

    if (error instanceof AxiosError) {
      const { response } = error
      throw new CustomError(response!.status, response!.data.error)
    }

    throw CustomError.internalServer('Internal Server Error')
  }
}
