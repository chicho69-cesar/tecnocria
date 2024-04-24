import { StyleSheet, Text } from 'react-native'

interface Props {
  title: string
}

export default function ScreenHeader({ title }: Props) {
  return <Text style={styles.header}>{title}</Text>
}

const styles = StyleSheet.create({
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff'
  }
})
