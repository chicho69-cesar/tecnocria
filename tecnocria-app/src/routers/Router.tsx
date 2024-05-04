import { NavigationContainer } from '@react-navigation/native'
import { useEffect } from 'react'

import { auth, getSession, useAuth } from '@/modules/auth'
import { AuthNavigator, DrawerNavigator } from './navigators'

export default function Router() {
  const { isLogged, authenticate } = useAuth()

  useEffect(() => {
    const getSessionFromStore = async () => {
      const userLogged = await getSession()

      if (userLogged != null) {
        try {
          const { user } = await auth(userLogged.token)
          authenticate(user, userLogged.token!)
        } catch (error) {
          console.log(error)
        }
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
