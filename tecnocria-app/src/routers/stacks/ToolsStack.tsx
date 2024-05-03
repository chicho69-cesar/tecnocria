import { createStackNavigator } from '@react-navigation/stack'

import { colors } from '@/config'
import {
  Audiovisual,
  Books,
  Professionals,
  SupportTools
} from '@/modules/tools'
import { OpenDrawer, ScreenHeader } from '../components'

const Stack = createStackNavigator()

export default function ToolsStack() {
  return (
    <Stack.Navigator
      initialRouteName='SupportTools'
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
        name='SupportTools'
        component={SupportTools}
        options={{
          headerTitle: () => <ScreenHeader title='Tecnocria' />,
          headerLeft: () => <OpenDrawer />
        }}
      />

      <Stack.Screen
        name='Books'
        component={Books}
        options={{
          headerTitle: () => <ScreenHeader title='Tecnocria' />,
          headerLeft: () => <OpenDrawer />
        }}
      />

      <Stack.Screen
        name='Audiovisual'
        component={Audiovisual}
        options={{
          headerTitle: () => <ScreenHeader title='Tecnocria' />,
          headerLeft: () => <OpenDrawer />
        }}
      />

      <Stack.Screen
        name='Professionals'
        component={Professionals}
        options={{
          headerTitle: () => <ScreenHeader title='Tecnocria' />,
          headerLeft: () => <OpenDrawer />
        }}
      />
    </Stack.Navigator>
  )
}
