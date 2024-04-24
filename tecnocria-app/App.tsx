/* eslint-disable import/first */
global.__reanimatedWorkletInit = () => {}

import { colors } from '@/config'
import { Router } from '@/routers'
import { StatusBar } from 'expo-status-bar'

export default function App() {
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
