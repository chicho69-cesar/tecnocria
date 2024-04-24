import { NavigationContainer } from '@react-navigation/native'
import { useEffect } from 'react'

import { getSession, useAuth } from '@/modules/auth'
import { AuthNavigator, DrawerNavigator } from './navigators'

export default function Router() {
  const { isLogged, authenticate } = useAuth()

  useEffect(() => {
    const getSessionFromStore = async () => {
      const userLogged = await getSession()

      if (userLogged != null) {
        authenticate(userLogged.user!, userLogged.token!)
      }
    }

    getSessionFromStore()
  }, [authenticate])

  return (
    <NavigationContainer>
      {isLogged ? <DrawerNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  )
}
