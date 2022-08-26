import { ErrorStatus } from "../entities"

export class CreateLocalFileError extends Error {
  status = ErrorStatus.INTERNAL

  constructor(message: string) {
    super(message)
    this.name = "CreateLocalFileError"
  }
}
