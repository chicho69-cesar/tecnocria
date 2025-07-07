import { ADVICE_SCREENS, STACKS, TOOLS_SCREENS } from '@/core/constants'
import { useNavigate } from '@/core/hooks'
import { Container, InfoCard, Logo, Title } from '@/core/ui'
import { AdviceCard } from '../components'

const advices = require('../../../../assets/img/advices.png')
const kids = require('../../../../assets/img/kids.png')

export default function Home() {
  const { navigateBetweenRoutes } = useNavigate()

  return (
    <Container>
      <Logo />

      <InfoCard
        title='Bienvenido'
        description='Recuerda ser el adulto que necesitabas cuando eras niño.'
      />

      <Title title='Recomendaciones' />

      <AdviceCard
        image={advices}
        title='Explora la sección de consejos'
        onPress={() =>
          navigateBetweenRoutes(
            STACKS.ADVICE_STACK,
            ADVICE_SCREENS.ADVICE_SECTION,
            {}
          )
        }
      />

      <AdviceCard
        image={kids}
        title='Explora las herramientas de apoyo'
        onPress={() =>
          navigateBetweenRoutes(
            STACKS.TOOLS_STACK,
            TOOLS_SCREENS.SUPPORT_TOOLS,
            {}
          )
        }
      />
    </Container>
  )
}
