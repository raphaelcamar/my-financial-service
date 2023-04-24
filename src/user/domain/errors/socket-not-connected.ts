import { ErrorStatus } from "@core/generic/domain/entities"

export class SocketNotConnected extends Error {
  public status = ErrorStatus.INTERNAL

  constructor() {
    super("Não foi possível estabelecer as conexão entre cliente e servidor.")
  }
}
