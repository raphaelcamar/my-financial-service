import { UseCase, ValidateFields } from "@core/generic/data/protocols"
import { Transaction } from "@transaction/domain/entities"
import { TransactionRepository } from "@transaction/data/protocols"
import { InvalidParamError, ValidationError } from "@transaction/domain/errors"
import { UnexpectedError } from "@core/generic/domain/errors"

export class UpdateTransaction implements UseCase<void> {
  constructor(
    private transaction: Transaction,
    private transactionRepository: TransactionRepository,
    private transactionValidation: ValidateFields
  ) {}

  async execute(): Promise<void> {
    if (!this.transaction) throw new InvalidParamError()

    const error = this.transactionValidation.validate()

    if (error) {
      throw new ValidationError(error.error, error.stack)
    }

    await this.transactionRepository.updateTransaction(this.transaction)
  }
}
