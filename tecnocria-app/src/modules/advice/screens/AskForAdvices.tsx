import { colors } from '@/config'
import { Button, Container, Logo, TextArea, Title } from '@/core/ui'
import { useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { useAskAdvices } from '../hooks'

export default function AskForAdvices() {
  const [question, setQuestion] = useState('')
  const { advices, loading, askAdvices } = useAskAdvices()

  return (
    <Container>
      <Logo />
      <Title title='Pide consejos personalizados' />

      <View style={{ height: 20 }} />

      <TextArea
        label='¿Qué necesitas?'
        value={question}
        onChange={setQuestion}
        placeholder='Escribe aquí tu pregunta'
      />

      <Button
        onPress={async () => {
          const message = question.trim()
          await askAdvices(message)
          setQuestion('')
        }}
        disabled={loading}>
        <Text style={styles.buttonText}>Enviar pregunta</Text>
      </Button>

      <View style={{ height: 20 }} />

      <View>
        {loading ? (
          <View style={{ marginVertical: 16 }}>
            <ActivityIndicator size='large' color={colors.primary} />
          </View>
        ) : advices != null ? (
          <View style={{ marginBottom: 12 }}>
            <View style={styles.container}>
              <Text style={styles.text}>{advices.data}</Text>
            </View>
          </View>
        ) : (
          <></>
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
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Acme'
  }
})
