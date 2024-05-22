import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { envs } from '@/config'
import { Button, Container, Input, Spinner } from '@/core/ui'
import { useAuth } from '@/modules/auth'
import { Feather } from '@expo/vector-icons'
import { useConfig } from '../hooks'
import { uploadProfileImage } from '../services/users.service'

const noImage = require('../../../../assets/img/no-image.jpg')

export default function EditInfo() {
  const { user, token } = useAuth()
  const { updateInfo, loading } = useConfig()
  const [name, setName] = useState(user?.name ?? '')
  const [lastName, setLastName] = useState(user?.lastName ?? '')
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
    if (image) {
      await uploadProfileImage(image, token!)
    }

    await updateInfo(name, lastName)
  }

  if (loading) {
    return <Spinner text='Guardando cambios' />
  }

  return (
    <Container>
      <View style={styles.container}>
        {user?.image ? (
          <Image
            source={{ uri: `${envs.SOCKET_URL}/${user.image}` }}
            style={styles.image}
          />
        ) : (
          <Image source={noImage} style={styles.image} />
        )}
      </View>

      <View style={styles.container}>
        <TouchableOpacity onPress={pickImage} style={styles.imageSelect}>
          <Text style={styles.imageSelectText}>Cambiar imagen</Text>
          <Feather name='upload' size={24} color='#25292e' />
        </TouchableOpacity>
      </View>

      <Input
        label='Nombre'
        value={name}
        placeholder='Escribe tu nombre'
        onChange={value => setName(value)}
        keyboardType='default'
      />

      <Input
        label='Apellidos'
        value={lastName}
        placeholder='Escribe tus apellidos'
        onChange={value => setLastName(value)}
        keyboardType='default'
      />

      <Button onPress={handleSaveChanges}>
        <Text style={styles.buttonText}>Guardar cambios</Text>
      </Button>
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: 180,
    height: 180,
    borderRadius: 90
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
