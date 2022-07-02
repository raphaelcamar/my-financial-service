import { ErrorStatus } from "@core/generic/domain/entities"

export class DeleteTransactionError extends Error {
  status = ErrorStatus.BAD_REQUEST

  constructor() {
    super("Não foi possível deletar a transação.")
    this.name = "DeleteTransactionError"
  }
}
