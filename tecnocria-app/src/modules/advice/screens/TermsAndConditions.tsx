import { ADVICE_SCREENS, STACKS, useNavigate } from '@/core'
import { Button, Container, Logo, Title } from '@/core/ui'
import { StyleSheet, Text, View } from 'react-native'

export default function TermsAndConditions() {
  const { navigateBetweenRoutes } = useNavigate()

  return (
    <Container>
      <Logo />
      <Title title='Términos y Condiciones de Uso' />

      <View>
        <Text style={styles.subtitle}>
          Por favor, lee atentamente los siguientes términos y condiciones antes
          de utilizar nuestra aplicación móvil.
        </Text>

        <Text style={styles.text}>
          1.- Aceptación de los Términos: Al acceder y utilizar nuestra
          aplicación móvil, aceptas automáticamente todos los términos y
          condiciones aquí establecidos. Si no estás de acuerdo con alguno de
          estos términos, te rogamos que no utilices nuestra aplicación.
        </Text>

        <Text style={styles.text}>
          2.- Uso de la Aplicación: Nuestra aplicación móvil está diseñada para
          ser utilizada únicamente con fines informativos y educativos. Queda
          prohibido su uso con cualquier otro propósito no autorizado por
          nosotros.
        </Text>

        <Text style={styles.text}>
          3.- Contenido: Todo el contenido proporcionado en nuestra aplicación,
          incluyendo textos, imágenes, videos y otros materiales, está protegido
          por derechos de autor y otros derechos de propiedad intelectual. No
          está permitido copiar, distribuir o modificar este contenido sin
          nuestro consentimiento expreso.
        </Text>

        <Text style={styles.text}>
          4.- Responsabilidad del Usuario: Eres responsable de mantener la
          confidencialidad de tu cuenta y contraseña, así como de todas las
          actividades que ocurran bajo tu cuenta. Nos reservamos el derecho de
          suspender o cancelar tu cuenta si detectamos cualquier uso indebido o
          actividad sospechosa.
        </Text>

        <Text style={styles.text}>
          5.- Privacidad: Nos comprometemos a proteger tu privacidad y a cumplir
          con todas las leyes y regulaciones aplicables en materia de protección
          de datos. Para obtener más información sobre cómo recopilamos,
          utilizamos y protegemos tu información personal, consulta nuestra
          Política de Privacidad.
        </Text>

        <Text style={styles.text}>
          6.- Modificaciones: Nos reservamos el derecho de modificar, suspender
          o cancelar cualquier aspecto de nuestra aplicación móvil en cualquier
          momento y sin previo aviso. Te recomendamos que revises periódicamente
          estos términos y condiciones para estar al tanto de cualquier cambio.
        </Text>

        <Text style={styles.text}>
          7.- Limitación de Responsabilidad: En ningún caso seremos responsables
          ante ti o cualquier tercero por daños directos, indirectos,
          incidentales, especiales o consecuentes que surjan del uso o la
          imposibilidad de uso de nuestra aplicación móvil.
        </Text>

        <Text style={styles.text}>
          Al utilizar nuestra aplicación móvil, aceptas cumplir con estos
          términos y condiciones. Si tienes alguna pregunta o inquietud sobre
          estos términos, no dudes en ponerte en contacto con nosotros.
        </Text>

        <Text style={styles.text}>
          Fecha de última actualización: 6 de mayo de 2024
        </Text>

        <Button
          onPress={() => {
            navigateBetweenRoutes(STACKS.ADVICE_STACK, ADVICE_SCREENS.HOME, {})
          }}>
          <Text style={styles.buttonText}>Aceptar</Text>
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
  buttonText: {
    fontSize: 18,
    fontFamily: 'Acme',
    color: '#fff'
  }
})
