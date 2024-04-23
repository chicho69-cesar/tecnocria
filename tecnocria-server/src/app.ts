import { envs } from './config'
import { AppRouter, Server } from './core'
import { MongoDatabase } from './data/mongodb'

async function main() {
  await MongoDatabase.connect({
    databaseName: envs.MONGO_DB_NAME,
    mongoUrl: envs.MONGO_URL
  })

  const server = new Server({
    port: envs.PORT,
    router: AppRouter.routes
  })

  await server.start()
}

// eslint-disable-next-line prettier/prettier
; (() => {
  main()
})()
