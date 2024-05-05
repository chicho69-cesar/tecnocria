import { colors } from '@/config'
import { FontAwesome } from '@expo/vector-icons'
import { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface InfoCardProps {
  title: string
  description: string
}

export default function InfoCard({ title, description }: InfoCardProps) {
  const [isShown, setIsShown] = useState(true)

  if (!isShown) {
    return null
  }

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>

        <TouchableOpacity onPress={() => setIsShown(false)}>
          <FontAwesome name='close' size={24} color='#25292e' />
        </TouchableOpacity>
      </View>

      <Text style={styles.description}>{description}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.fourth,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    elevation: 2,
    paddingVertical: 16,
    paddingHorizontal: 8,
    marginBottom: 16
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: 18,
    fontFamily: 'Acme'
  },
  description: {
    fontSize: 15,
    color: '#25292e',
    marginTop: 8,
    fontFamily: 'Roboto'
  }
})
