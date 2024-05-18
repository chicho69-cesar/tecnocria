import { colors } from '@/config'
import { ADVICE_SCREENS, STACKS, useNavigate, useParams } from '@/core'
import { Button, Container, InfoCard, Title } from '@/core/ui'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { useAdvices } from '../hooks'

export default function Advices() {
  const { navigateBetweenRoutes } = useNavigate()
  const { category } = useParams<{ category: string }>()
  const { loading, advices } = useAdvices(category)

  return (
    <Container>
      <InfoCard
        title={`Consejos sobre ${category}`}
        description={`Explora los consejos y recomendaciones sobre ${category}`}
      />

      <Title title='Consejos' />

      <View>
        {loading ? (
          <View style={{ marginVertical: 16 }}>
            <ActivityIndicator size='large' color={colors.primary} />
          </View>
        ) : (
          <View style={{ marginVertical: 12 }}>
            <View style={styles.container}>
              <Text style={styles.text}>{advices.data}</Text>
            </View>

            <Button
              onPress={() => {
                navigateBetweenRoutes(
                  STACKS.ADVICE_STACK,
                  ADVICE_SCREENS.ASK_FOR_ADVICES,
                  {}
                )
              }}>
              <Text style={styles.buttonText}>
                Pide consejos personalizados
              </Text>
            </Button>
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
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Acme',
    color: '#fff'
  }
})
