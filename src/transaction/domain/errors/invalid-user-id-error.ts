import { ErrorStatus } from "@core/generic/domain/entities"

export class InvalidUserIdError extends Error {
  status = ErrorStatus.UNAUTHORIZED

  constructor() {
    super("Missing userId")
    this.name = "MissingCredentialsError"
  }
}
