export const envs = {
  SERVER_URL: process.env.EXPO_PUBLIC_SERVER_URL ?? 'http://localhost:3000',
  SOCKET_URL:
    process.env.EXPO_PUBLIC_SOCKET_SERVER_URL ?? 'http://localhost:3000',
  SESSION_NAME: process.env.EXPO_PUBLIC_SESSION_NAME ?? 'tecnocria'
}
