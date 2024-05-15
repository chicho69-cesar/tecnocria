import { colors } from '@/config'
import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'

interface TextAreaProps {
  label: string
  value: string
  onChange: (text: string) => void
  placeholder: string
}

export default function TextArea({
  label,
  value,
  onChange,
  placeholder
}: TextAreaProps) {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        keyboardType='default'
        style={styles.input}
        multiline
        numberOfLines={6}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    gap: 4,
    marginBottom: 8
  },
  label: {
    color: '#25292e',
    fontSize: 18,
    fontFamily: 'Acme'
  },
  input: {
    color: '#25292e',
    fontSize: 16,
    padding: 8,
    borderWidth: 2,
    borderColor: colors.third,
    borderRadius: 4,
    backgroundColor: colors.fourth
  }
})
