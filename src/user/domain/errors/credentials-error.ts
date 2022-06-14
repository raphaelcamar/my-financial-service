import { ErrorStatus } from "@core/generic/domain/entities"

export class CredentialsError extends Error {
  public status = ErrorStatus.UNAUTHORIZED

  constructor() {
    super("Login ou senha estão incorretos. Tente novamente")
  }
}
