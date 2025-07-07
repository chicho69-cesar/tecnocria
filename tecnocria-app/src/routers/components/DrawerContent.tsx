import {
  DrawerContentScrollView,
  DrawerItem,
  // DrawerItemList,
  type DrawerContentComponentProps
} from '@react-navigation/drawer'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { colors, envs } from '@/config'
import { useNavigate } from '@/core/hooks'
import { Roles } from '@/core/types'
import { clearSession, signOut, useAuth } from '@/modules/auth'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import {
  ADVICE_SCREENS,
  CHAT_SCREENS,
  CONFIGURATION_SCREENS,
  STACKS,
  TOOLS_SCREENS
} from '../../core/constants/navs'

const noImage = require('../../../assets/img/no-image.jpg')

export default function DrawerContent(props: DrawerContentComponentProps) {
  const { user, isLogged, token, logout } = useAuth()
  const { navigateBetweenRoutes } = useNavigate()

  const handleSignOut = async () => {
    try {
      await signOut(token!)
      await clearSession()
      logout()
    } catch (error) {
      console.log(`Error en el sign-out: ${error}`)
    }
  }

  return (
    <DrawerContentScrollView {...props}>
      {/* <DrawerItemList {...props} /> */}

      <View style={styles.container}>
        {user?.image ? (
          <Image
            source={{ uri: `${envs.SOCKET_URL}/${user.image}` }}
            style={styles.image}
          />
        ) : (
          <Image source={noImage} style={styles.image} />
        )}
      </View>

      <View style={styles.container}>
        <Text style={styles.name}>
          {user?.name} {user?.lastName}
        </Text>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity
          onPress={() => {
            navigateBetweenRoutes(
              STACKS.CONFIGURATION_STACK,
              CONFIGURATION_SCREENS.EDIT_INFO,
              {}
            )
          }}
          style={[styles.button, styles.configButton]}>
          <Ionicons name='settings-outline' size={24} color='#25292e' />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSignOut}
          style={[styles.button, styles.logoutButton]}>
          <MaterialIcons name='logout' size={24} color='#fff' />
        </TouchableOpacity>
      </View>

      <DrawerItem
        label={() => (
          <Text style={{ color: 'white', fontSize: 16, fontFamily: 'Acme' }}>
            Acerca de
          </Text>
        )}
        onPress={() => {
          navigateBetweenRoutes(STACKS.ADVICE_STACK, ADVICE_SCREENS.ABOUT, {})
        }}
      />

      <DrawerItem
        label={() => (
          <Text style={{ color: 'white', fontSize: 16, fontFamily: 'Acme' }}>
            Términos y condiciones
          </Text>
        )}
        onPress={() => {
          navigateBetweenRoutes(
            STACKS.ADVICE_STACK,
            ADVICE_SCREENS.TERMS_AND_CONDITIONS,
            {}
          )
        }}
      />

      <DrawerItem
        label={() => (
          <Text style={{ color: 'white', fontSize: 16, fontFamily: 'Acme' }}>
            Chat de ayuda
          </Text>
        )}
        onPress={() => {
          navigateBetweenRoutes(STACKS.CHAT_STACK, CHAT_SCREENS.GLOBAL_CHAT, {})
        }}
      />

      <DrawerItem
        label={() => (
          <Text style={{ color: 'white', fontSize: 16, fontFamily: 'Acme' }}>
            Herramientas
          </Text>
        )}
        onPress={() => {
          navigateBetweenRoutes(
            STACKS.TOOLS_STACK,
            TOOLS_SCREENS.SUPPORT_TOOLS,
            {}
          )
        }}
      />

      <DrawerItem
        label={() => (
          <Text style={{ color: 'white', fontSize: 16, fontFamily: 'Acme' }}>
            Configuración
          </Text>
        )}
        onPress={() => {
          navigateBetweenRoutes(
            STACKS.CONFIGURATION_STACK,
            CONFIGURATION_SCREENS.SETTINGS,
            {}
          )
        }}
        style={{ paddingVertical: 2 }}
      />

      {isLogged && user?.role === Roles.profesional ? (
        <>
          {/* TODO: Correct links */}
          <DrawerItem
            label={() => (
              <Text
                style={{ color: 'white', fontSize: 16, fontFamily: 'Acme' }}>
                Dashboard
              </Text>
            )}
            onPress={() => {
              navigateBetweenRoutes(
                STACKS.ADVICE_STACK,
                ADVICE_SCREENS.HOME,
                {}
              )
            }}
            style={{ paddingVertical: 2 }}
          />
        </>
      ) : null}
    </DrawerContentScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: 160,
    height: 160,
    borderRadius: 80
  },
  name: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Acme'
  },
  actionsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    marginBottom: 16
  },
  button: {
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2
  },
  configButton: {
    backgroundColor: '#fff'
  },
  logoutButton: {
    backgroundColor: colors.red
  }
})
