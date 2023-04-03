import { UseCase, ValidateFields } from "@core/generic/data/protocols"
import { TransactionProtocol } from "@user/data/protocols"
import { Transaction } from "@user/domain/entities"
import { InvalidParamError, ValidationError } from "@user/domain/errors"

export class UpdateTransaction implements UseCase<void> {
  constructor(private transaction: Transaction, private transactionRepository: TransactionProtocol, private transactionValidation: ValidateFields) {}

  async execute(): Promise<void> {
    if (!this.transaction) throw new InvalidParamError()

    const error = this.transactionValidation.validate()

    if (error) {
      throw new ValidationError(error.error, error.stack)
    }

    await this.transactionRepository.updateTransaction(this.transaction)
  }
}
