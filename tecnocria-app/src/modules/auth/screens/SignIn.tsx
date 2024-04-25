import { Pressable, StyleSheet, Text } from 'react-native'

import { colors } from '@/config'
import { useNavigate } from '@/core'
import { Button, Input, Logo, Spinner, Title } from '@/core/ui'
import { AuthContainer, PasswordInput } from '../components'
import { useSignIn } from '../hooks'

export default function SignIn() {
  const { navigate } = useNavigate()
  const {
    email,
    password,
    isLoading,
    errors,
    setEmail,
    setPassword,
    handleSignIn
  } = useSignIn()

  if (isLoading) return <Spinner text='Iniciando sesión' />

  return (
    <AuthContainer>
      <Logo />

      <Title title='Iniciar sesión' />

      <Input
        label='Correo electrónico'
        value={email}
        placeholder='Ingresa tu correo electrónico'
        onChange={value => setEmail(value)}
        keyboardType='email-address'
        error={errors.email}
      />

      <PasswordInput
        label='Contraseña'
        value={password}
        onChange={value => setPassword(value)}
        placeholder='Ingresa tu contraseña'
        error={errors.password}
      />

      <Button onPress={handleSignIn}>
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </Button>

      <Pressable onPress={() => navigate('SignUp')} style={styles.pressable}>
        <Text style={styles.text}>
          ¿Aún no tienes una cuenta?{' '}
          <Text style={styles.highlightedText}>Regístrate</Text>
        </Text>
      </Pressable>
    </AuthContainer>
  )
}

const styles = StyleSheet.create({
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Acme'
  },
  pressable: {
    marginTop: 32
  },
  text: {
    color: colors.active,
    fontFamily: 'Roboto',
    fontSize: 16,
    marginBottom: 16
  },
  highlightedText: {
    color: colors.primary,
    fontFamily: 'Acme'
  }
})
