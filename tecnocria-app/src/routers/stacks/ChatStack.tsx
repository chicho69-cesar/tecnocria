import { createStackNavigator } from '@react-navigation/stack'

import { colors } from '@/config'
import { Chat, Chats, GlobalChat } from '@/modules/chat'
import { OpenDrawer, ScreenHeader } from '../components'

const Stack = createStackNavigator()

export default function ChatStack() {
  return (
    <Stack.Navigator
      initialRouteName='Chats'
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
        name='Chats'
        component={Chats}
        options={{
          headerTitle: () => <ScreenHeader title='Tecnocria' />,
          headerLeft: () => <OpenDrawer />
        }}
      />

      <Stack.Screen
        name='Chat'
        component={Chat}
        options={{
          headerTitle: () => <ScreenHeader title='Tecnocria' />,
          headerLeft: () => <OpenDrawer />
        }}
      />

      <Stack.Screen
        name='GlobalChat'
        component={GlobalChat}
        options={{
          headerTitle: () => <ScreenHeader title='Tecnocria' />,
          headerLeft: () => <OpenDrawer />
        }}
      />
    </Stack.Navigator>
  )
}
