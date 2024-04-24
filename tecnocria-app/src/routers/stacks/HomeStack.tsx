import { createStackNavigator } from '@react-navigation/stack'

import { colors } from '@/config'
import { Home } from '@/modules/advice'
import { OpenDrawer, ScreenHeader } from '../components'

const Stack = createStackNavigator()

export default function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName='Home'
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
        name='Home'
        component={Home}
        options={{
          headerTitle: () => <ScreenHeader title='Tecnocria' />,
          headerLeft: () => <OpenDrawer />
        }}
      />
    </Stack.Navigator>
  )
}
