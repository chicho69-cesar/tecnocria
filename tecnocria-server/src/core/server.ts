import { Server as HttpServer, createServer } from 'node:http'
import express, { Express, Router } from 'express'
import { Server as SocketServer } from 'socket.io'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import morgan from 'morgan'
import { SocketManager } from './sockets'

interface Options {
  port: number
  router: Router
}

export class Server {
  public readonly app: Express = express()
  public readonly server: HttpServer
  public readonly port: number
  public readonly router: Router
  public readonly io: SocketServer

  public constructor(options: Options) {
    const { port, router } = options

    this.port = port
    this.router = router

    this.configureMiddlewares()

    this.server = createServer(this.app)
    this.io = new SocketServer(this.server)

    this.configureSockets()
  }

  public configureMiddlewares(): void {
    // CORS
    this.app.use(cors())
    // JSON parser
    this.app.use(express.json())
    // Logger
    this.app.use(morgan('tiny'))
    // Static folder
    this.app.use(express.static('public'))
    // URL parser
    this.app.use(express.urlencoded({ extended: true }))
    // File uploads
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: '/tmp/',
        createParentPath: true
      })
    )
    // Router
    this.app.use(this.router)
  }

  public configureSockets(): void {
    const socketManager = new SocketManager(this.io)
    socketManager.socketEvents()
  }

  public async start(): Promise<void> {
    this.server.listen(this.port, '0.0.0.0', () => {
      console.log(`Server running on port ${this.port}`)
    })
  }
}
