import { createStackNavigator } from '@react-navigation/stack'

import { colors } from '@/config'
import { AddFamiliar, EditInfo, Tools } from '@/modules/configuration'
import { OpenDrawer, ScreenHeader, UserLogged } from '../components'

const Stack = createStackNavigator()

export default function ConfigurationStack() {
  return (
    <Stack.Navigator
      initialRouteName='Tools'
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
          elevation: 5,
          borderBottomLeftRadius: 12,
          borderBottomRightRadius: 12
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          color: '#fff'
        }
      }}>
      <Stack.Screen
        name='Tools'
        component={Tools}
        options={{
          headerTitle: () => <ScreenHeader title='Tecnocria' />,
          headerLeft: () => <OpenDrawer />,
          headerRight: () => <UserLogged />
        }}
      />

      <Stack.Screen
        name='EditInfo'
        component={EditInfo}
        options={{
          headerTitle: () => <ScreenHeader title='Tecnocria' />,
          headerLeft: () => <OpenDrawer />,
          headerRight: () => <UserLogged />
        }}
      />

      <Stack.Screen
        name='AddFamiliar'
        component={AddFamiliar}
        options={{
          headerTitle: () => <ScreenHeader title='Tecnocria' />,
          headerLeft: () => <OpenDrawer />,
          headerRight: () => <UserLogged />
        }}
      />
    </Stack.Navigator>
  )
}
