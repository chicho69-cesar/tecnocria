import { MaterialIcons } from '@expo/vector-icons'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import { Pressable } from 'react-native'

export default function OpenDrawer() {
  const navigation = useNavigation()

  return (
    <Pressable
      onPress={() => {
        navigation.dispatch(DrawerActions.openDrawer())
      }}>
      <MaterialIcons
        name='menu'
        size={24}
        color='#fff'
        style={{ marginLeft: 10 }}
      />
    </Pressable>
  )
}
