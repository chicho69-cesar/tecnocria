import { clearSession, useAuth } from '@/modules/auth'
import { Text, View } from 'react-native'

export default function Home() {
  const { logout } = useAuth()

  const handleClick = () => {
    logout()
    clearSession()
  }

  return (
    <View>
      <Text onPress={handleClick}>Home</Text>
    </View>
  )
}
