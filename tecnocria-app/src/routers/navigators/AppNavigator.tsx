import { FontAwesome } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { colors } from '@/config'
import { HomeStack } from '../stacks'

const Tab = createBottomTabNavigator()

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.primary,
          paddingBottom: 6,
          paddingTop: 4,
          height: 60
        },
        tabBarActiveTintColor: colors.active,
        tabBarInactiveTintColor: '#fff',
        lazy: false,
        tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' }
      }}
      initialRouteName='HomeStack'>
      <Tab.Screen
        name='HomeStack'
        component={HomeStack}
        options={{
          tabBarLabel: 'Inicio',
          tabBarIcon: ({ color }) => (
            <FontAwesome name='home' color={color} size={24} />
          )
        }}
      />
    </Tab.Navigator>
  )
}
