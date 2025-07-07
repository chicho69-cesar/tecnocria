import { envs } from '@/config'
import { Auth } from '@/core/types'
import * as SecureStore from 'expo-secure-store'

export async function getSession() {
  try {
    const session = await SecureStore.getItemAsync(envs.SESSION_NAME!)
    return session != null ? (JSON.parse(session) as Auth) : null
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function setSession(session: Auth) {
  try {
    await SecureStore.setItemAsync(envs.SESSION_NAME!, JSON.stringify(session))
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

export async function clearSession() {
  try {
    await SecureStore.deleteItemAsync(envs.SESSION_NAME!)
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}
