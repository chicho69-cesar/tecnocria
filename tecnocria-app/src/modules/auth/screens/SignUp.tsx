import { Pressable, StyleSheet, Text, View } from 'react-native'

import { colors } from '@/config'
import { useNavigate } from '@/core/hooks'
import { Button, Input, Logo, Spinner, Title } from '@/core/ui'
import { AuthContainer, PasswordInput } from '../components'
import { useSignUp } from '../hooks'

const image = require('../../../../assets/img/rompe-cabezas.png')

export default function SignUp() {
  const { navigate } = useNavigate()
  const {
    name,
    lastName,
    email,
    username,
    password,
    confirmPassword,
    isLoading,
    errors,
    setName,
    setLastName,
    setEmail,
    setUsername,
    setPassword,
    setConfirmPassword,
    handleSignUp
  } = useSignUp()

  if (isLoading) return <Spinner text='Registrando' />

  return (
    <AuthContainer>
      <Logo />
      <View style={styles.separator} />

      <Title title='Regístrate' withImage image={image} />

      <Input
        label='Nombre'
        value={name}
        placeholder='Ingresa tu nombre'
        onChange={value => setName(value)}
        keyboardType='default'
        error={errors.name}
      />

      <Input
        label='Apellidos'
        value={lastName}
        placeholder='Ingresa tus apellidos'
        onChange={value => setLastName(value)}
        keyboardType='default'
        error={errors.lastName}
      />

      <Input
        label='Nombre de usuario'
        value={username}
        placeholder='Ingresa tu nombre de usuario'
        onChange={value => setUsername(value)}
        keyboardType='default'
        error={errors.username}
      />

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

      <PasswordInput
        label='Confirmar contraseña'
        value={confirmPassword}
        onChange={value => setConfirmPassword(value)}
        placeholder='Confirma tu contraseña'
        error={errors.confirmPassword}
      />

      <Button onPress={handleSignUp}>
        <Text style={styles.buttonText}>Regístrate</Text>
      </Button>

      <Pressable onPress={() => navigate('SignIn')} style={styles.pressable}>
        <Text style={styles.text}>
          ¿Ya tienes una cuenta?{' '}
          <Text style={styles.highlightedText}>Inicia sesión</Text>
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
  },
  separator: {
    marginTop: 40
  }
})
