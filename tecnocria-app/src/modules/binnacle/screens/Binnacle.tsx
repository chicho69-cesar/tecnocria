import { Entypo, MaterialIcons } from '@expo/vector-icons'
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { colors } from '@/config'
import { BINNACLE_SCREENS, STACKS, useNavigate } from '@/core'
import { Button, Container, Logo, Spinner, Title } from '@/core/ui'
import { ProgressBar } from '../components'
import { useBinnacles } from '../hooks'

const image = require('../../../../assets/img/bitacora.png')

export default function Binnacle() {
  const { navigateBetweenRoutes } = useNavigate()
  const { loading, binnacles, deleteBinnacle } = useBinnacles()

  if (loading) {
    return <Spinner text='Cargando bitácoras' />
  }

  return (
    <Container>
      <Logo />
      <Title title='Bitácora' withImage image={image} />

      {binnacles.map(binnacle => (
        <View key={binnacle.id} style={styles.binnacleCard}>
          <View style={styles.info}>
            <Text style={styles.title}>{binnacle.name}</Text>
            <Text style={styles.description}>{binnacle.description}</Text>
            <ProgressBar progress={binnacle.progress} />
          </View>

          <View style={styles.actions}>
            <TouchableOpacity
              onPress={() => {
                navigateBetweenRoutes(
                  STACKS.BINNACLE_STACK,
                  BINNACLE_SCREENS.EDIT_BINNACLE,
                  { binnacle }
                )
              }}>
              <Entypo name='pencil' size={24} color='#25292e' />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                // Add confirmation dialog here
                Alert.alert(
                  'Confirmación de eliminación',
                  '¿Estás seguro de que deseas eliminar esta bitácora?',
                  [
                    {
                      text: 'Cancelar',
                      style: 'cancel'
                    },
                    {
                      text: 'Eliminar',
                      style: 'destructive',
                      onPress: () => deleteBinnacle(binnacle.id)
                    }
                  ]
                )
              }}>
              <MaterialIcons name='delete' size={24} color='#25292e' />
            </TouchableOpacity>
          </View>
        </View>
      ))}

      <View style={{ height: 10 }} />

      <Button
        onPress={() => {
          navigateBetweenRoutes(
            STACKS.BINNACLE_STACK,
            BINNACLE_SCREENS.ADD_BINNACLE,
            {}
          )
        }}>
        <Text style={styles.buttonText}>Agregar bitácora</Text>
      </Button>

      <View style={{ height: 10 }} />
    </Container>
  )
}

const styles = StyleSheet.create({
  binnacleCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16,
    padding: 16,
    marginTop: 16,
    backgroundColor: colors.fourth,
    borderRadius: 10,
    elevation: 2
  },
  info: {
    flex: 1
  },
  title: {
    fontSize: 18,
    fontFamily: 'Acme'
  },
  description: {
    fontSize: 16,
    fontFamily: 'Roboto',
    marginBottom: 8
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Acme',
    color: '#fff'
  },
  actions: {
    flexDirection: 'column',
    gap: 4
  }
})
