/* eslint-disable no-console */
import { ErrorStatus } from "@core/generic/domain/entities"

export class UnexpectedError extends Error {
  status = ErrorStatus.INTERNAL

  constructor(err?: any) {
    super("Um erro interno Aconteceu. Tente novamente mais tarde")
    console.log(err)
    this.name = "UnexpectedError"
  }
}
