import { ErrorStatus } from "@core/generic/domain/entities"

export class NotFoundTagError extends Error {
  status = ErrorStatus.NOT_FOUND

  constructor() {
    super("Tag não encontrada.")
    this.name = "DeleteTransactionError"
  }
}
