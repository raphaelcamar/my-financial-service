/* eslint-disable no-console */
import { ErrorStatus } from "@core/generic/domain/entities"

export class InvalidParamError extends Error {
  status = ErrorStatus.NOT_ACCEPTABLE

  constructor() {
    super("Está faltando o envio da transação.")
    this.name = "InvalidParamError"
  }
}
