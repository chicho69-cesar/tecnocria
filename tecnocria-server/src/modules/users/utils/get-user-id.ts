import { JWT } from '../../../config'

export async function getUserId(token: string): Promise<string | null> {
  const user = await JWT.validateToken<{ id: string }>(token)

  if (!user) {
    return null
  }

  return user.id
}
