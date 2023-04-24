import { DefaultEventsMap } from "socket.io/dist/typed-events"
/* eslint-disable no-use-before-define */
import http from "http"
import { Server, Socket } from "socket.io"

export class SocketSingletonRepository {
  private static instance: SocketSingletonRepository

  io: Server

  private connectionInstance: Socket

  private constructor() {}

  public static getInstance(): SocketSingletonRepository {
    if (!SocketSingletonRepository.instance) {
      SocketSingletonRepository.instance = new SocketSingletonRepository()
    }
    return SocketSingletonRepository.instance
  }

  public init(server: http.Server): void {
    this.io = new Server(server, {
      cors: {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
      },
    })

    this.io.on("connection", (socket: Socket) => {
      const { userId, walletId } = socket.handshake.query
      socket.join(userId)
      socket.join(walletId)
    })
  }

  public getConnectionInstance(): Socket {
    if (this.connectionInstance) return this.connectionInstance
    return null
  }
}
