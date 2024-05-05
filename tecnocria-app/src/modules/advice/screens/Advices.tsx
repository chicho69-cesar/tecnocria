import { useParams } from '@/core'
import { Container } from '@/core/ui'
import { Text, View } from 'react-native'

export default function Advices() {
  const { category } = useParams<{ category: string }>()
  console.log(category)

  return (
    <Container>
      <View>
        <Text>Advices</Text>
      </View>
    </Container>
  )
}
