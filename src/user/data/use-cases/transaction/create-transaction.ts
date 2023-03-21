import { Transaction } from "@user/domain/entities"
import { UseCase } from "@core/generic/data/protocols"
import { UnexpectedError } from "@core/generic/domain/errors"
import { InvalidParamError, ValidationError } from "@user/domain/errors"
import { TransactionValidation } from "@user/presenters/validation"
import { TransactionProtocol } from "@user/data/protocols"

export class CreateTransaction implements UseCase<Transaction> {
  constructor(
    private transaction: Transaction,
    private transactionRepository: TransactionProtocol,
    private transactionValidation: TransactionValidation
  ) {}

  async execute(): Promise<Transaction> {
    if (!this.transaction) throw new InvalidParamError()

    const error = this.transactionValidation.validate()

    if (error) {
      throw new ValidationError(error.error, error.stack)
    }

    const result = await this.transactionRepository.create(this.transaction)

    if (!result) throw new UnexpectedError()

    return result
  }
}
