/* eslint-disable no-console */
import { ErrorStatus } from "@core/generic/domain/entities"

export class UnexpectedError extends Error {
  status = ErrorStatus.INTERNAL

  constructor(err?: any) {
    console.log(err)
    super("Um erro interno Aconteceu. Tente novamente mais tarde")
    this.name = "UnexpectedError"
  }
}
