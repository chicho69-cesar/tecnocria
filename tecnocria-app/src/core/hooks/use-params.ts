import { useRoute } from '@react-navigation/native'

export function useParams<T>(): T {
  const route = useRoute()
  return route.params as T
}
