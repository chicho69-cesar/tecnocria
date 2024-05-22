import { colors } from '@/config'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface ChatCardProps {
  image: any
  title: string
  description: string
  onPress?: () => void
}

export default function ChatCard({
  image,
  title,
  description,
  onPress
}: ChatCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={image} style={styles.image} />

      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    elevation: 2,
    marginBottom: 16,
    backgroundColor: colors.fourth,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
    padding: 8
  },
  image: {
    width: 80,
    height: 80,
    marginHorizontal: 'auto',
    aspectRatio: 1 / 1,
    resizeMode: 'cover',
    borderRadius: 40
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: 2
  },
  title: {
    fontSize: 18,
    fontFamily: 'Acme'
  },
  description: {
    fontSize: 15,
    fontFamily: 'Roboto'
  }
})
