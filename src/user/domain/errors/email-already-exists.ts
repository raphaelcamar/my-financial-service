import { ErrorStatus } from "@core/generic/domain/entities"

export class EmailAlreadyExistsError extends Error {
  public status = ErrorStatus.NOT_ACCEPTABLE

  constructor() {
    super("Este e-mail já está cadastrado.")
  }
}
