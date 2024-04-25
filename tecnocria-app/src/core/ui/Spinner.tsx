import { useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'

interface Props {
  text?: string
}

export default function Spinner({ text }: Props) {
  const [dots, setDots] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prevDots => {
        return prevDots.length === 6 ? '' : prevDots + '. '
      })
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <View style={styles.container}>
      <ActivityIndicator size='large' color='#ED9455' />

      <Text style={styles.dots}>
        {text && text} {dots}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  dots: {
    marginTop: 10,
    color: '#ED9455',
    fontFamily: 'Acme',
    fontSize: 20
  }
})
