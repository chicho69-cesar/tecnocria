import { NavigationContainer } from '@react-navigation/native'
import { useEffect, useState } from 'react'

import { Spinner } from '@/core/ui'
import { auth, getSession, useAuth } from '@/modules/auth'
import { AuthNavigator, DrawerNavigator } from './navigators'

export default function Router() {
  const [isLoading, setIsLoading] = useState(false)
  const { isLogged, authenticate } = useAuth()

  useEffect(() => {
    const getSessionFromStore = async () => {
      setIsLoading(true)
      const userLogged = await getSession()

      if (userLogged != null) {
        try {
          const { user } = await auth(userLogged.token)
          authenticate(user, userLogged.token!)
        } catch (error) {
          console.log(error)
        } finally {
          setIsLoading(false)
        }
      }
    }

    getSessionFromStore()
  }, [authenticate])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <NavigationContainer>
      {isLogged ? <DrawerNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  )
}
