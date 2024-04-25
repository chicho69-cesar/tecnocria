import { colors } from '@/config'
import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'

interface Props {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  keyboardType?:
    | 'default'
    | 'numeric'
    | 'email-address'
    | 'phone-pad'
    | 'number-pad'
    | 'decimal-pad'
    | 'visible-password'
    | 'ascii-capable'
    | 'numbers-and-punctuation'
    | 'url'
    | 'name-phone-pad'
    | 'twitter'
    | 'web-search'
  isDisabled?: boolean
  error?: string | null
}

export default function Input({
  label,
  value,
  onChange,
  placeholder,
  keyboardType,
  isDisabled = false,
  error = null
}: Props) {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        keyboardType={keyboardType}
        style={[
          styles.input,
          error ? styles.inputError : styles.inputWithoutError
        ]}
        editable={!isDisabled}
        selectTextOnFocus={!isDisabled}
      />

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
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
  input: {
    fontSize: 14,
    padding: 8,
    borderWidth: 2,
    borderRadius: 8,
    backgroundColor: colors.backgroundSecondary,
    fontFamily: 'Roboto'
  },
  inputWithoutError: {
    borderColor: colors.third,
    color: colors.active
  },
  inputError: {
    borderColor: colors.red,
    color: colors.red
  },
  error: {
    color: colors.red,
    fontSize: 14,
    fontFamily: 'Acme'
  }
})
