import { createDrawerNavigator } from '@react-navigation/drawer'

import { colors } from '@/config'
import { DrawerContent } from '../components'
import AppNavigator from './AppNavigator'

const Drawer = createDrawerNavigator()

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName='App'
      screenOptions={{
        drawerStyle: {
          backgroundColor: colors.primary
        },
        drawerActiveTintColor: colors.background,
        drawerInactiveTintColor: '#fff',
        drawerLabelStyle: {
          color: '#fff'
        }
      }}
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen
        name='App'
        component={AppNavigator}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  )
}
