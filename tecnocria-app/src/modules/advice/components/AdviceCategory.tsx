import { colors } from '@/config'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface AdviceCategoryProps {
  title: string
  image: any
  onPress: () => void
}

export default function AdviceCategory({
  title,
  image,
  onPress
}: AdviceCategoryProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
      </View>

      <Image source={image} style={styles.image} resizeMode='contain' />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    elevation: 2,
    marginBottom: 16,
    backgroundColor: '#fff',
    width: '48%',
    alignItems: 'center'
  },
  header: {
    width: '100%',
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  },
  title: {
    fontSize: 16,
    fontFamily: 'Acme',
    color: '#fff',
    textAlign: 'center'
  },
  image: {
    maxWidth: '100%',
    height: 150,
    marginHorizontal: 'auto',
    aspectRatio: 1 / 1,
    resizeMode: 'cover'
  }
})
