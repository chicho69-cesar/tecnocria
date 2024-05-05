import { colors } from '@/config'
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native'

interface AdviceCardProps {
  title: string
  image: any
  onPress: () => void
}

export default function AdviceCard({ title, image, onPress }: AdviceCardProps) {
  return (
    <TouchableOpacity onPress={onPress} style={style.card}>
      <Image source={image} style={style.image} resizeMode='cover' />
      <Text style={style.title}>{title}</Text>
    </TouchableOpacity>
  )
}

const style = StyleSheet.create({
  card: {
    borderRadius: 8,
    elevation: 2,
    padding: 8,
    marginBottom: 16,
    backgroundColor: colors.fourth
  },
  image: {
    maxWidth: '100%',
    height: 200,
    marginBottom: 8,
    borderRadius: 4,
    aspectRatio: 16 / 9,
    resizeMode: 'cover'
  },
  title: {
    fontSize: 16,
    fontFamily: 'Acme'
  }
})
