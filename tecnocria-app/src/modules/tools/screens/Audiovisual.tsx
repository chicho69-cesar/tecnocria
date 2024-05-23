/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'

import { colors } from '@/config'
import { Container, InfoCard, Title } from '@/core/ui'
import { useResources } from '../hooks'

export default function Audiovisual() {
  const { loading, audiovisual, fetchAudiovisual } = useResources()

  useEffect(() => {
    fetchAudiovisual()
  }, [])

  return (
    <Container>
      <InfoCard
        title='Recursos Audiovisuales'
        description='Aquí encontrarás una lista de recursos audiovisuales recomendados.'
      />

      <Title title='Recursos Audiovisuales' />

      <View>
        {loading ? (
          <View style={{ marginVertical: 16 }}>
            <ActivityIndicator size='large' color={colors.primary} />
          </View>
        ) : (
          <View style={{ marginVertical: 12 }}>
            <View style={styles.container}>
              <Text style={styles.text}>{audiovisual.data}</Text>
            </View>
          </View>
        )}
      </View>
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 8,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: colors.fourth,
    padding: 16,
    elevation: 2
  },
  text: {
    fontSize: 17,
    color: '#25292e',
    fontFamily: 'Roboto'
  }
})
