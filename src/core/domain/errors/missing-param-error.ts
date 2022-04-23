import { ErrorStatus } from "../entities"

export class MissingParamError extends Error {
  status = ErrorStatus.UNPROCESSABLE_ENTITY

  constructor(message: string) {
    super(message)
    this.name = "UnexpectedError"
  }
}
