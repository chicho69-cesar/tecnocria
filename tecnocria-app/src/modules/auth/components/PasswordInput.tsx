import { colors } from '@/config'
import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'

interface Props {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  isDisabled?: boolean
  error?: string | null
}

export default function PasswordInput({
  label,
  value,
  placeholder,
  onChange,
  isDisabled,
  error = null
}: Props) {
  const [showPassword, setShowPassword] = useState(false)

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <View
        style={[
          styles.inputContainer,
          error ? styles.inputContainerError : styles.inputContainerWithoutError
        ]}>
        <TextInput
          style={[
            styles.input,
            error ? styles.inputError : styles.inputWithoutError
          ]}
          placeholder={placeholder}
          secureTextEntry={!showPassword}
          value={value}
          onChangeText={onChange}
          editable={!isDisabled}
          selectTextOnFocus={!isDisabled}
        />

        <TouchableOpacity onPress={toggleShowPassword}>
          <Ionicons
            name={showPassword ? 'eye-off' : 'eye'}
            size={24}
            color={colors.active}
          />
        </TouchableOpacity>
      </View>

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    gap: 4,
    marginVertical: 8
  },
  label: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Acme'
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 4,
    padding: 8,
    borderWidth: 2,
    borderRadius: 8,
    backgroundColor: colors.backgroundSecondary
  },
  input: {
    flex: 1,
    color: colors.active,
    fontSize: 14,
    fontFamily: 'Roboto'
  },
  inputContainerWithoutError: {
    borderColor: colors.third
  },
  inputContainerError: {
    borderColor: colors.red
  },
  inputWithoutError: {
    color: colors.active
  },
  inputError: {
    color: colors.red
  },
  error: {
    color: colors.red,
    fontSize: 14,
    fontFamily: 'Acme'
  }
})
