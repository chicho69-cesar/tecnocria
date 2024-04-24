import {
  DrawerContentScrollView,
  DrawerItem,
  type DrawerContentComponentProps
} from '@react-navigation/drawer'
import { useNavigation } from '@react-navigation/native'
import { Text } from 'react-native'

import { Roles } from '@/core'
import { useAuth } from '@/modules/auth'

export default function DrawerContent(props: DrawerContentComponentProps) {
  const { user, isLogged } = useAuth()
  const navigation = useNavigation<any>()

  const handleNavigate = (screen: string) => {
    navigation.navigate('HomeStack', {
      screen
    })
  }

  return (
    <DrawerContentScrollView {...props}>
      {/* <DrawerItemList {...props} /> */}

      {/* TODO: Image */}
      {/* TODO: Name */}

      <DrawerItem
        label={() => (
          <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>
            Inicio
          </Text>
        )}
        onPress={() => {
          handleNavigate('Home')
        }}
      />

      {/* TODO: Links */}

      {isLogged && user?.role === Roles.profesional ? (
        <>
          {/* TODO: Correct links */}
          <DrawerItem
            label={() => (
              <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>
                Dashboard
              </Text>
            )}
            onPress={() => {
              handleNavigate('Dashboard')
            }}
          />
        </>
      ) : null}
    </DrawerContentScrollView>
  )
}
