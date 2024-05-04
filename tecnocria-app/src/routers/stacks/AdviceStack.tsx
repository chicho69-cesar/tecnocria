import { createStackNavigator } from '@react-navigation/stack'

import { colors } from '@/config'
import {
  About,
  AdviceSection,
  Advices,
  AskForAdvices,
  Home,
  TermsAndConditions
} from '@/modules/advice'
import { OpenDrawer, ScreenHeader, UserLogged } from '../components'

const Stack = createStackNavigator()

export default function AdviceStack() {
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
          headerLeft: () => <OpenDrawer />,
          headerRight: () => <UserLogged />
        }}
      />

      <Stack.Screen
        name='AdviceSection'
        component={AdviceSection}
        options={{
          headerTitle: () => <ScreenHeader title='Tecnocria' />,
          headerLeft: () => <OpenDrawer />,
          headerRight: () => <UserLogged />
        }}
      />

      <Stack.Screen
        name='Advices'
        component={Advices}
        options={{
          headerTitle: () => <ScreenHeader title='Tecnocria' />,
          headerLeft: () => <OpenDrawer />,
          headerRight: () => <UserLogged />
        }}
      />

      <Stack.Screen
        name='AskForAdvices'
        component={AskForAdvices}
        options={{
          headerTitle: () => <ScreenHeader title='Tecnocria' />,
          headerLeft: () => <OpenDrawer />,
          headerRight: () => <UserLogged />
        }}
      />

      <Stack.Screen
        name='About'
        component={About}
        options={{
          headerTitle: () => <ScreenHeader title='Tecnocria' />,
          headerLeft: () => <OpenDrawer />,
          headerRight: () => <UserLogged />
        }}
      />

      <Stack.Screen
        name='TermsAndConditions'
        component={TermsAndConditions}
        options={{
          headerTitle: () => <ScreenHeader title='Tecnocria' />,
          headerLeft: () => <OpenDrawer />,
          headerRight: () => <UserLogged />
        }}
      />
    </Stack.Navigator>
  )
}
