import { colors } from '@/config'
import { Image, StyleSheet, Text, View } from 'react-native'

interface Props {
  title: string
  withImage?: boolean
  image?: any
}

export default function Title({ title, withImage = false, image }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      {withImage && image && (
        <Image source={image} style={{ width: 96, height: 96 }} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
    color: colors.primary,
    fontFamily: 'Acme'
  }
})
