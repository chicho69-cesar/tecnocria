import { createStackNavigator } from '@react-navigation/stack'

import { colors } from '@/config'
import { AddBinnacle, Binnacle, EditBinnacle } from '@/modules/binnacle'
import { OpenDrawer, ScreenHeader } from '../components'

const Stack = createStackNavigator()

export default function BinnacleStack() {
  return (
    <Stack.Navigator
      initialRouteName='Binnacle'
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
        name='Binnacle'
        component={Binnacle}
        options={{
          headerTitle: () => <ScreenHeader title='Tecnocria' />,
          headerLeft: () => <OpenDrawer />
        }}
      />

      <Stack.Screen
        name='AddBinnacle'
        component={AddBinnacle}
        options={{
          headerTitle: () => <ScreenHeader title='Tecnocria' />,
          headerLeft: () => <OpenDrawer />
        }}
      />

      <Stack.Screen
        name='EditBinnacle'
        component={EditBinnacle}
        options={{
          headerTitle: () => <ScreenHeader title='Tecnocria' />,
          headerLeft: () => <OpenDrawer />
        }}
      />
    </Stack.Navigator>
  )
}
