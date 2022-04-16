/* eslint-disable no-console */
import { ErrorStatus } from "@core/domain/entities"

export class UnexpectedError extends Error {
  status = ErrorStatus.INTERNAL

  constructor() {
    super("Um erro interno Aconteceu. Tente novamente mais tarde")
    this.name = "UnexpectedError"
    console.error(this.name)
  }
}
