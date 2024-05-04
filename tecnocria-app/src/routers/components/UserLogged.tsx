import { FontAwesome5 } from '@expo/vector-icons'
import { StyleSheet, Text, View } from 'react-native'

import { useAuth } from '@/modules/auth'

export default function UserLogged() {
  const { user } = useAuth()

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{user?.username}</Text>
      <FontAwesome5 name='user' size={20} color='#fff' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginRight: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  text: {
    color: '#fff',
    fontFamily: 'Acme',
    fontSize: 16
  }
})
