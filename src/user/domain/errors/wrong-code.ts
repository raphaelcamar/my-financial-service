import { ErrorStatus } from "@core/generic/domain/entities"

export class WrongCodeError extends Error {
  public status = ErrorStatus.NOT_ACCEPTABLE

  constructor() {
    super("Código inválido.")
  }
}
