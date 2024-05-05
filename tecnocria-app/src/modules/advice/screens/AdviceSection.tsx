import { StyleSheet, View } from 'react-native'

import { ADVICE_SCREENS, STACKS, useNavigate } from '@/core'
import { Container, InfoCard, Title } from '@/core/ui'
import { AdviceCategory } from '../components'

const maternity = require('../../../../assets/categories/maternidad.png')
const waysOfParenting = require('../../../../assets/categories/formas-de-crianza.png')
const didacticGames = require('../../../../assets/categories/juegos-didacticos.png')
const securityAndHealth = require('../../../../assets/categories/salud.png')
const education = require('../../../../assets/categories/educacion.png')
const workAndFamilyLife = require('../../../../assets/categories/vida.png')
const nutrition = require('../../../../assets/categories/nutricion.png')
const motorAndCognitive = require('../../../../assets/categories/desarrollo.png')

export default function AdviceSection() {
  const { navigateBetweenRoutes } = useNavigate()

  const handlePress = (category: string) => {
    navigateBetweenRoutes(STACKS.ADVICE_STACK, ADVICE_SCREENS.ADVICES, {
      category
    })
  }

  return (
    <Container>
      <InfoCard
        title='Consejos'
        description='Explora diversas categorías de consejos para apoyarte en la crianza de tus hijos.'
      />

      <Title title='Categorías' />

      <View style={styles.grid}>
        <AdviceCategory
          title='Maternidad'
          image={maternity}
          onPress={() => handlePress('Maternidad')}
        />

        <AdviceCategory
          title='Formas de crianza'
          image={waysOfParenting}
          onPress={() => handlePress('Formas de crianza')}
        />

        <AdviceCategory
          title='Juegos didácticos'
          image={didacticGames}
          onPress={() => handlePress('Juegos didácticos')}
        />

        <AdviceCategory
          title='Salud y seguridad'
          image={securityAndHealth}
          onPress={() => handlePress('Salud y seguridad')}
        />

        <AdviceCategory
          title='Educación'
          image={education}
          onPress={() => handlePress('Educación')}
        />

        <AdviceCategory
          title='Vida laboral y familiar'
          image={workAndFamilyLife}
          onPress={() => handlePress('Vida laboral y familiar')}
        />

        <AdviceCategory
          title='Nutrición'
          image={nutrition}
          onPress={() => handlePress('Nutrición')}
        />

        <AdviceCategory
          title='Desarrollo motriz y cognitivo'
          image={motorAndCognitive}
          onPress={() => handlePress('Desarrollo motriz y cognitivo')}
        />
      </View>
    </Container>
  )
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  }
})
