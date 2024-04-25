import { useNavigation } from '@react-navigation/native'

export function useNavigate() {
  const navigation = useNavigation<any>()

  const navigate = (screen: string) => {
    navigation.navigate(screen)
  }

  const navigateWithParams = (screen: string, params: any) => {
    navigation.navigate(screen, params)
  }

  const navigateBetweenRoutes = (
    navigator: string,
    route: string,
    params: any
  ) => {
    navigation.navigate(navigator, {
      screen: route,
      params
    })
  }

  return {
    navigate,
    navigateWithParams,
    navigateBetweenRoutes
  }
}
