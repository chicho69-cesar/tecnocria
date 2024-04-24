import { createStackNavigator } from '@react-navigation/stack'

import { colors } from '@/config'
import { RecoverPassword, SignIn, SignUp } from '@/modules/auth'
import { ScreenHeader } from '../components'

const Stack = createStackNavigator()

export default function AuthNavigator() {
  return (
    <Stack.Navigator
      initialRouteName='SignIn'
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
        name='SignIn'
        component={SignIn}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name='SignUp'
        component={SignUp}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name='RecoverPassword'
        component={RecoverPassword}
        options={{
          headerTitle: () => <ScreenHeader title='Recuperar contraseña' />
        }}
      />
    </Stack.Navigator>
  )
}
