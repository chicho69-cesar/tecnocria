import { MaterialCommunityIcons } from '@expo/vector-icons'
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

import { colors, envs } from '@/config'
import { CONFIGURATION_SCREENS, STACKS } from '@/core/constants'
import { useNavigate } from '@/core/hooks'
import { Button, Container, Logo, Title } from '@/core/ui'
import { useAuth } from '@/modules/auth'
import { useParents } from '../hooks'

const image = require('../../../../assets/img/configuracion.png')
const noImage = require('../../../../assets/img/no-image.jpg')
const parentImage = require('../../../../assets/img/parent.png')

export default function Settings() {
  const { user } = useAuth()
  const { navigateBetweenRoutes } = useNavigate()
  const { loading, parents } = useParents()

  return (
    <Container>
      <Logo />
      <Title title='Configuración' withImage image={image} />

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

      <View style={styles.header}>
        <Text style={styles.title}>
          {user?.name} {user?.lastName}
        </Text>

        <TouchableOpacity
          onPress={() => {
            navigateBetweenRoutes(
              STACKS.CONFIGURATION_STACK,
              CONFIGURATION_SCREENS.EDIT_INFO,
              {}
            )
          }}
          style={styles.button}>
          <MaterialCommunityIcons name='lead-pencil' size={24} color='#fff' />
        </TouchableOpacity>
      </View>

      <Title title='Familiares' />

      <View>
        {loading ? (
          <View style={{ marginVertical: 16 }}>
            <ActivityIndicator size='large' color={colors.primary} />
          </View>
        ) : (
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

                <Text style={styles.parentRelationship}>
                  {parent.relationship}
                </Text>

                <Text style={styles.parentAge}>{parent.age} años</Text>
              </View>
            ))}
          </View>
        )}
      </View>

      <Button
        onPress={() => {
          navigateBetweenRoutes(
            STACKS.CONFIGURATION_STACK,
            CONFIGURATION_SCREENS.ADD_FAMILIAR,
            {}
          )
        }}>
        <Text style={styles.buttonText}>Agregar familiar</Text>
      </Button>

      <View style={{ height: 10 }} />
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
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    marginBottom: 16
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontFamily: 'Acme'
  },
  button: {
    backgroundColor: colors.primary,
    padding: 8,
    borderRadius: 8,
    elevation: 2
  },
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
  }
})
