import { colors } from '@/config'
import { StyleSheet, TouchableOpacity } from 'react-native'

interface Props {
  children: React.ReactNode | React.ReactNode[] 
  onPress: () => void
  disabled?: boolean
}

export default function Button({ children, onPress, disabled = false }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.button}
      disabled={disabled}>
      {children}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 32,
    marginVertical: 8
  }
})
