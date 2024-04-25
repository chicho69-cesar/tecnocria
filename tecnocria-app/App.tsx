/* eslint-disable import/first */
global.__reanimatedWorkletInit = () => {}

import { Roboto_400Regular } from '@expo-google-fonts/roboto'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'

import { colors } from '@/config'
import { Router } from '@/routers'

export default function App() {
  const [fontsLoaded] = useFonts({
    Acme: require('./assets/fonts/Acme-Regular.ttf'),
    Roboto: Roboto_400Regular
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
    <>
      <Router />

      <StatusBar
        style='light'
        backgroundColor={colors.primary}
        translucent={false}
        animated
        hidden={false}
        hideTransitionAnimation='slide'
        networkActivityIndicatorVisible
      />
    </>
  )
}
