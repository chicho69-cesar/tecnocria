import { CHAT_SCREENS, STACKS, useNavigate } from '@/core'
import { Container, InfoCard, Logo, Title } from '@/core/ui'
import { ChatCard } from '../components'

const general = require('../../../../assets/categories/general.png')
const hugBuddy = require('../../../../assets/categories/hug-buddy.png')
const maternity = require('../../../../assets/categories/maternidad.png')
const waysOfParenting = require('../../../../assets/categories/formas-de-crianza.png')
const didacticGames = require('../../../../assets/categories/juegos-didacticos.png')
const securityAndHealth = require('../../../../assets/categories/salud.png')
const education = require('../../../../assets/categories/educacion.png')
const workAndFamilyLife = require('../../../../assets/categories/vida.png')
const nutrition = require('../../../../assets/categories/nutricion.png')
const motorAndCognitive = require('../../../../assets/categories/desarrollo.png')

export default function Chats() {
  const { navigateBetweenRoutes } = useNavigate()

  const handlePress = (category: string, title: string) => {
    navigateBetweenRoutes(STACKS.CHAT_STACK, CHAT_SCREENS.CHAT, {
      title,
      category
    })
  }

  return (
    <Container>
      <Logo />

      <Title title='Chats generales' />

      <InfoCard
        title='Chats'
        description='Conoce a HugBuddy nuestro asistente de chat con Inteligencia Artificial o conoce a otros padres en la sección de chats generales.'
      />

      <ChatCard
        image={general}
        title='Chat general'
        description='Conversa con otros padres y madres sobre cualquier tema.'
        onPress={() => {
          navigateBetweenRoutes(STACKS.CHAT_STACK, CHAT_SCREENS.GLOBAL_CHAT, {})
        }}
      />

      <ChatCard
        image={hugBuddy}
        title='HugBuddy'
        description='Conoce a nuestro asistente de chat con Inteligencia Artificial.'
        onPress={() => {
          navigateBetweenRoutes(
            STACKS.CHAT_STACK,
            CHAT_SCREENS.HUG_BUDDY_CHAT,
            {}
          )
        }}
      />

      <Title title='Salas de chat' />

      <InfoCard
        title='Salas de chat'
        description='Conéctate con otros padres y madres en las salas de chat por temáticas.'
      />

      <ChatCard
        image={maternity}
        title='Maternidad'
        description='Conversa con otros padres y madres sobre la maternidad.'
        onPress={() => handlePress('maternity', 'Maternidad')}
      />

      <ChatCard
        image={waysOfParenting}
        title='Formas de crianza'
        description='Comparte tus experiencias y aprende de otras formas de crianza.'
        onPress={() => handlePress('waysOfParenting', 'Formas de crianza')}
      />

      <ChatCard
        image={didacticGames}
        title='Juegos didácticos'
        description='Descubre juegos didácticos para tus hijos y comparte tus recomendaciones.'
        onPress={() => handlePress('didacticGames', 'Juegos didácticos')}
      />

      <ChatCard
        image={securityAndHealth}
        title='Salud y seguridad'
        description='Conversa sobre temas de salud y seguridad de tus hijos.'
        onPress={() => handlePress('securityAndHealth', 'Salud y seguridad')}
      />

      <ChatCard
        image={education}
        title='Educación'
        description='Comparte tus experiencias y aprende de otras formas de educar a tus hijos.'
        onPress={() => handlePress('education', 'Educación')}
      />

      <ChatCard
        image={workAndFamilyLife}
        title='Vida laboral y familiar'
        description='Conversa sobre la vida laboral y familiar.'
        onPress={() =>
          handlePress('workAndFamilyLife', 'Vida laboral y familiar')
        }
      />

      <ChatCard
        image={nutrition}
        title='Nutrición'
        description='Comparte tus recetas y recomendaciones para una buena nutrición.'
        onPress={() => handlePress('nutrition', 'Nutrición')}
      />

      <ChatCard
        image={motorAndCognitive}
        title='Desarrollo motriz y cognitivo'
        description='Conversa sobre el desarrollo motriz y cognitivo de tus hijos.'
        onPress={() =>
          handlePress('motorAndCognitive', 'Desarrollo motriz y cognitivo')
        }
      />
    </Container>
  )
}
