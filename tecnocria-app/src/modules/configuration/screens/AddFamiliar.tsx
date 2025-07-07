import { Feather } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { CONFIGURATION_SCREENS, STACKS } from '@/core/constants'
import { useNavigate } from '@/core/hooks'
import { Button, Container, Input, Title } from '@/core/ui'
import { useParents } from '../hooks'

const noImage = require('../../../../assets/img/no-image.jpg')

export default function AddFamiliar() {
  const { addParent } = useParents()
  const { navigateBetweenRoutes } = useNavigate()

  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [relationship, setRelationship] = useState('')
  const [age, setAge] = useState(0)
  const [image, setImage] = useState<string | undefined>()
  const [, setImageFileName] = useState<string | undefined>()

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1
    })

    if (!result.canceled) {
      const newImage = result.assets[0].uri
      const newImageFileName = result.assets[0].fileName

      setImage(newImage)

      if (newImageFileName != null && newImageFileName !== undefined) {
        setImageFileName(newImageFileName)
      }
    }
  }

  const handleSaveChanges = async () => {
    await addParent(name, lastName, relationship, age, image)

    navigateBetweenRoutes(
      STACKS.CONFIGURATION_STACK,
      CONFIGURATION_SCREENS.SETTINGS,
      {}
    )
  }

  return (
    <Container>
      <Title title='Agrega un familiar' />

      <Input
        label='Nombre'
        value={name}
        placeholder='Escribe el nombre'
        onChange={value => setName(value)}
        keyboardType='default'
      />

      <Input
        label='Apellidos'
        value={lastName}
        placeholder='Escribe los apellidos'
        onChange={value => setLastName(value)}
        keyboardType='default'
      />

      <Input
        label='Parentesco'
        value={relationship}
        placeholder='Escribe el parentesco'
        onChange={value => setRelationship(value)}
        keyboardType='default'
      />

      <Input
        label='Edad'
        value={`${age}`}
        placeholder='Escribe la edad'
        onChange={value => setAge(+value)}
        keyboardType='numeric'
      />

      <View style={styles.container}>
        <TouchableOpacity onPress={pickImage} style={styles.imageSelect}>
          <Text style={styles.imageSelectText}>Seleccionar imagen</Text>
          <Feather name='upload' size={24} color='#25292e' />
        </TouchableOpacity>
      </View>

      {image ? (
        <View style={styles.container}>
          <Image source={{ uri: image }} style={styles.image} />
        </View>
      ) : (
        <View style={styles.container}>
          <Image source={noImage} style={styles.image} />
        </View>
      )}

      <Button onPress={handleSaveChanges}>
        <Text style={styles.buttonText}>Guardar cambios</Text>
      </Button>

      <View style={{ height: 10 }} />
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10
  },
  imageSelect: {
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#25292e',
    backgroundColor: '#fff'
  },
  imageSelectText: {
    color: '#25292e',
    fontFamily: 'Acme'
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Acme',
    color: '#fff'
  }
})
