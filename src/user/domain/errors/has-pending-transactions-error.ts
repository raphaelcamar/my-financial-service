import { ErrorStatus } from "@core/generic/domain/entities"

export class HasPendingTransactionsError extends Error {
  public status = ErrorStatus.BAD_REQUEST

  public details: object

  constructor(pendingTransactionsId?: string[]) {
    super("Você possui transações não finalizadas. Finalize, ou remova-os para continuar.")
    this.details = pendingTransactionsId
  }
}
