import { ErrorStatus } from "@core/generic/domain/entities"

export class WrongParamError extends Error {
  tatus = ErrorStatus.BAD_REQUEST

  constructor() {
    super("Parâmetro inválido.")
    this.name = "WrongParamError"
  }
}
