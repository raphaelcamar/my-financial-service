/* eslint-disable no-console */
import { ErrorStatus } from "@core/domain/entities"

export class InvalidUserIdError extends Error {
  status = ErrorStatus.UNAUTHORIZED

  constructor() {
    super("Missing userId")
    this.name = "MissingCredentialsError"
    console.error(this.name)
  }
}
