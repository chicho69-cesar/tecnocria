import { colors } from '@/config'
import { STACKS, TOOLS_SCREENS } from '@/core/constants'
import { useNavigate } from '@/core/hooks'
import { Container, InfoCard, Logo } from '@/core/ui'
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native'

const books = require('../../../../assets/img/bitacora.png')
const audiovisual = require('../../../../assets/img/herramientas.png')
// const professionals = require('../../../../assets/img/rompe-cabezas.png')

export default function SupportTools() {
  const { navigateBetweenRoutes } = useNavigate()

  return (
    <Container>
      <Logo />

      <InfoCard
        title='Herramientas de apoyo'
        description='Aquí encontrarás herramientas de apoyo para tu día a día.'
      />

      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          navigateBetweenRoutes(STACKS.TOOLS_STACK, TOOLS_SCREENS.BOOKS, {})
        }}>
        <Text style={styles.title}>Libros</Text>
        <Image source={books} style={styles.image} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          navigateBetweenRoutes(
            STACKS.TOOLS_STACK,
            TOOLS_SCREENS.AUDIOVISUAL,
            {}
          )
        }}>
        <Text style={styles.title}>Recursos Audiovisuales</Text>
        <Image source={audiovisual} style={styles.image} />
      </TouchableOpacity>

      {/* <TouchableOpacity
        style={styles.card}
        onPress={() => {
          navigateBetweenRoutes(
            STACKS.TOOLS_STACK,
            TOOLS_SCREENS.PROFESSIONALS,
            {}
          )
        }}>
        <Text style={styles.title}>Profesionales</Text>
        <Image source={professionals} style={styles.image} />
      </TouchableOpacity> */}
    </Container>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.fourth,
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8
  },
  title: {
    fontSize: 20,
    color: '#25292e',
    fontFamily: 'Acme'
  },
  image: {
    width: 160,
    height: 160
  }
})
