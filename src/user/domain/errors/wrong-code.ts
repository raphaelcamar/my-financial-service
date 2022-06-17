import { ErrorStatus } from "@core/generic/domain/entities"

export class WrongCodeError extends Error {
  public status = ErrorStatus.UNAUTHORIZED

  constructor() {
    super("Código inválido.")
  }
}
