import { Entypo } from '@expo/vector-icons'
import { useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { colors, envs } from '@/config'
import { BINNACLE_SCREENS, STACKS } from '@/core/constants'
import { useNavigate, useParams } from '@/core/hooks'
import { Binnacle } from '@/core/types'
import { Button, Container, Input, Spinner, Title } from '@/core/ui'
import { useParents } from '@/modules/configuration'
import { ProgressBar } from '../components'
import { useBinnacles } from '../hooks'

const image = require('../../../../assets/img/bitacora.png')
const parentImage = require('../../../../assets/img/parent.png')

export default function EditBinnacle() {
  const { binnacle } = useParams<{ binnacle: Binnacle }>()
  const { navigateBetweenRoutes } = useNavigate()
  const { updateBinnacle, loading } = useBinnacles()
  const { parents } = useParents()

  const [name, setName] = useState(binnacle.name)
  const [description, setDescription] = useState(binnacle.description)
  const [progress, setProgress] = useState(binnacle.progress * 100)
  const [selectedParents, setSelectedParents] = useState<string[]>(
    binnacle.parents.map(parent => parent.id)
  )

  const handleSelectParent = (id: string) => {
    if (selectedParents.includes(id)) {
      setSelectedParents(selectedParents.filter(parentId => parentId !== id))
    } else {
      setSelectedParents([...selectedParents, id])
    }
  }

  const handleSaveChanges = async () => {
    await updateBinnacle(
      binnacle.id,
      name,
      description,
      progress / 100,
      selectedParents
    )
    navigateBetweenRoutes(STACKS.BINNACLE_STACK, BINNACLE_SCREENS.BINNACLE, {})
  }

  if (loading) {
    return <Spinner text='Editando bitácora' />
  }

  return (
    <Container>
      <Title title='Bitácora' withImage image={image} />

      <Input
        label='Nombre'
        value={name}
        placeholder='Escribe el nombre'
        onChange={value => setName(value)}
        keyboardType='default'
      />

      <Input
        label='Descripción'
        value={description}
        placeholder='Escribe la descripción'
        onChange={value => setDescription(value)}
        keyboardType='default'
      />

      <Input
        label='Progreso'
        value={`${progress}`}
        placeholder='Escribe el progreso de 1 a 100%'
        onChange={value => setProgress(+value)}
        keyboardType='numeric'
      />

      <ProgressBar progress={progress / 100} />

      <View style={{ height: 20 }} />
      <Title title='Familiares' />
      <View style={{ height: 20 }} />

      <View style={styles.grid}>
        {parents.map(parent => (
          <View key={parent.id} style={styles.parentCard}>
            {parent.image ? (
              <Image
                source={{ uri: `${envs.SOCKET_URL}/${parent.image}` }}
                style={styles.parentImage}
              />
            ) : (
              <Image source={parentImage} style={styles.parentImage} />
            )}

            <Text style={styles.parentName}>
              {parent.name} {parent.lastName}
            </Text>

            <Text style={styles.parentRelationship}>{parent.relationship}</Text>
            <Text style={styles.parentAge}>{parent.age} años</Text>

            <TouchableOpacity
              onPress={() => {
                handleSelectParent(parent.id)
              }}
              style={styles.selectButton}>
              {selectedParents.includes(parent.id) ? (
                <Entypo name='minus' size={24} color='#25292e' />
              ) : (
                <Entypo name='plus' size={24} color='#25292e' />
              )}
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <Button onPress={handleSaveChanges}>
        <Text style={styles.buttonText}>Guardar</Text>
      </Button>

      <View style={{ height: 10 }} />
    </Container>
  )
}

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 18,
    fontFamily: 'Acme',
    color: '#fff'
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16
  },
  parentCard: {
    width: '45%',
    marginBottom: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    elevation: 1
  },
  parentImage: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  parentName: {
    fontSize: 14,
    color: '#25292e',
    fontFamily: 'Acme',
    textAlign: 'center',
    marginTop: 8
  },
  parentRelationship: {
    fontSize: 12,
    color: '#25292e',
    fontFamily: 'Roboto-Italic',
    textAlign: 'center'
  },
  parentAge: {
    fontSize: 13,
    color: '#25292e',
    textAlign: 'center',
    marginTop: 4
  },
  selectButton: {
    backgroundColor: colors.fourth,
    padding: 8,
    borderRadius: 8,
    elevation: 1,
    position: 'absolute',
    right: -8,
    top: -8
  }
})
