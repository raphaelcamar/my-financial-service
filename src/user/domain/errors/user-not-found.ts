import { ErrorStatus } from "@core/generic/domain/entities"

export class NotFoundUserError extends Error {
  public status = ErrorStatus.NOT_FOUND

  constructor() {
    super("Usuário não encontrado.")
  }
}
