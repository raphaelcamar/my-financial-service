import { ErrorStatus } from "@core/generic/domain/entities"

export class InvalidToken extends Error {
  public status = ErrorStatus.UNAUTHORIZED

  constructor() {
    super("Token expirado. Faça o login novamente")
  }
}
