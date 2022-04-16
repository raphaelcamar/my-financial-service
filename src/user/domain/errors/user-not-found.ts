import { ErrorStatus } from "@core/domain/entities"

export class NotFoundUserError extends Error {
  public status = ErrorStatus.NOT_FOUND

  constructor() {
    super("Usuário não encontrado.")
  }
}
