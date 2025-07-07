import { ADVICE_SCREENS, STACKS } from '@/core/constants'
import { useNavigate } from '@/core/hooks'
import { Button, Container, Logo } from '@/core/ui'
import { StyleSheet, Text, View } from 'react-native'
import Title from '../../../core/ui/Title'

export default function About() {
  const { navigateBetweenRoutes } = useNavigate()

  return (
    <Container>
      <Logo />
      <Title title='Acerca de nosotros' />

      <View>
        <Text style={styles.subtitle}>
          ¡Bienvenido a nuestra aplicación móvil!
        </Text>

        <Text style={styles.text}>
          En <Text style={styles.span}>Tecnocria</Text>, estamos comprometidos a
          brindarte la mejor experiencia posible para ayudarte a que tus hijos
          tengan una crianza más consciente y conectada. Nos enorgullece
          ofrecerte una plataforma intuitiva y llena de recursos diseñados para
          apoyarte en la importante tarea de educar a tus hijos en un mundo
          digital.
        </Text>

        <Text style={styles.text}>
          Nuestra misión es proporcionarte herramientas prácticas y
          conocimientos útiles que te permitan navegar por los desafíos modernos
          de la crianza con confianza y tranquilidad. Nos esforzamos por
          ofrecerte contenido relevante y de calidad, respaldado por la
          experiencia de profesionales en el campo de la crianza, la psicología
          infantil y la tecnología educativa.
        </Text>

        <Text style={styles.text}>
          En <Text style={styles.span}>Tecnocria</Text>, creemos en la
          importancia de fomentar una relación saludable entre padres e hijos,
          así como en promover un uso equilibrado y responsable de la tecnología
          en el hogar. Nos inspira la idea de crear un mundo donde padres e
          hijos puedan crecer juntos, aprender juntos y conectarse de manera
          significativa en el entorno digital de hoy en día.
        </Text>

        <Text style={styles.text}>
          Queremos que te sientas parte de nuestra comunidad y que encuentres en
          nuestra aplicación un espacio seguro y acogedor para compartir tus
          experiencias, hacer preguntas y obtener apoyo de otros padres que
          están pasando por situaciones similares. Estamos aquí para ti en cada
          paso del camino, brindándote el apoyo y la orientación que necesitas
          para ser el mejor padre que puedas ser.
        </Text>

        <Text style={styles.text}>
          Gracias por elegir <Text style={styles.span}>Tecnocria</Text>.
          ¡Esperamos que disfrutes tu experiencia con nosotros y que juntos
          podamos crear un futuro brillante para las generaciones venideras!
        </Text>

        <Button
          onPress={() => {
            navigateBetweenRoutes(STACKS.ADVICE_STACK, ADVICE_SCREENS.HOME, {})
          }}>
          <Text style={styles.buttonText}>¡Comienza ahora!</Text>
        </Button>
      </View>
    </Container>
  )
}

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 18,
    fontFamily: 'Acme',
    marginBottom: 12
  },
  text: {
    fontSize: 15,
    fontFamily: 'Roboto',
    marginBottom: 6
  },
  span: {
    fontFamily: 'Roboto-Italic'
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Acme',
    color: '#fff'
  }
})
