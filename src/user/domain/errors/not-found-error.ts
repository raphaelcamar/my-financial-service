import { ErrorStatus } from "@core/generic/domain/entities"

export class NotFoundError extends Error {
  public status = ErrorStatus.NOT_FOUND

  constructor() {
    super("Não foi possível encontrar o recurso solicitado.")
  }
}
