import {
  Entypo,
  FontAwesome,
  Fontisto,
  Ionicons,
  MaterialIcons
} from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { colors } from '@/config'
import {
  AdviceStack,
  BinnacleStack,
  ChatStack,
  ConfigurationStack,
  ToolsStack
} from '../stacks'

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
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: 'Acme'
        }
      }}
      initialRouteName='AdviceStack'>
      <Tab.Screen
        name='AdviceStack'
        component={AdviceStack}
        options={{
          tabBarLabel: 'Inicio',
          tabBarIcon: ({ color }) => (
            <FontAwesome name='home' color={color} size={20} />
          )
        }}
      />

      <Tab.Screen
        name='BinnacleStack'
        component={BinnacleStack}
        options={{
          tabBarLabel: 'Bitácora',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name='menu-book' color={color} size={20} />
          )
        }}
      />

      <Tab.Screen
        name='ChatStack'
        component={ChatStack}
        options={{
          tabBarLabel: 'Chats',
          tabBarIcon: ({ color }) => (
            <Fontisto name='hipchat' color={color} size={20} />
          )
        }}
      />

      <Tab.Screen
        name='ToolsStack'
        component={ToolsStack}
        options={{
          tabBarLabel: 'Herramientas',
          tabBarIcon: ({ color }) => (
            <Entypo name='tools' color={color} size={20} />
          )
        }}
      />

      <Tab.Screen
        name='ConfigurationStack'
        component={ConfigurationStack}
        options={{
          tabBarLabel: 'Configuración',
          tabBarIcon: ({ color }) => (
            <Ionicons name='settings-outline' color={color} size={20} />
          )
        }}
      />
    </Tab.Navigator>
  )
}
