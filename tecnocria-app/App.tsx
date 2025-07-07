/* eslint-disable import/first */
global.__reanimatedWorkletInit = () => {}

import {
  Roboto_400Regular,
  Roboto_400Regular_Italic
} from '@expo-google-fonts/roboto'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'

import { colors } from '@/config'
import { SocketProvider } from '@/core/context/sockets.context'
import { Router } from '@/routers'

export default function App() {
  const [fontsLoaded] = useFonts({
    Acme: require('./assets/fonts/Acme-Regular.ttf'),
    Roboto: Roboto_400Regular,
    'Roboto-Italic': Roboto_400Regular_Italic
  })

  useEffect(() => {
    const prepare = async () => {
      await SplashScreen.preventAutoHideAsync()

      if (fontsLoaded) {
        await SplashScreen.hideAsync()
      }
    }

    prepare()
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null
  }

  return (
    <SocketProvider>
      <Router />

      <StatusBar
        style='light'
        backgroundColor={colors.primary}
        animated
        hidden={false}
        hideTransitionAnimation='slide'
        networkActivityIndicatorVisible
      />
    </SocketProvider>
  )
}
