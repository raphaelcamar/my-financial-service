import { ErrorStatus } from "@core/generic/domain/entities"

export class NotFoundUserError extends Error {
  public status = ErrorStatus.UNAUTHORIZED

  constructor() {
    super("Usuário não encontrado.")
  }
}
