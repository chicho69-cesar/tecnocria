import { StyleSheet, TouchableOpacity } from 'react-native'

interface Props {
  children: React.ReactNode | React.ReactNode[] | JSX.Element | JSX.Element[]
  onPress: () => void
}

export default function Button({ children, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      {children}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ED9455',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 32,
    marginVertical: 8
  }
})
