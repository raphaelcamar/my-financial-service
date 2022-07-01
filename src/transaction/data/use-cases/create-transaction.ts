/* eslint-disable no-param-reassign */
/* eslint-disable no-multi-assign */
import { Transaction } from "@transaction/domain/entities"
import { TransactionRepository } from "@transaction/data/protocols"
import { UseCase } from "@core/generic/data/protocols"
import { UnexpectedError } from "@core/generic/domain/errors"
import { InvalidParamError, ValidationError } from "@transaction/domain/errors"
import { TransactionValidation } from "@transaction/presenters/validation"

export class CreateTransaction implements UseCase<Transaction> {
  constructor(
    private transaction: Transaction,
    private transactionRepository: TransactionRepository,
    private transactionValidation: TransactionValidation
  ) {}

  async execute(): Promise<Transaction> {
    if (!this.transaction) throw new InvalidParamError()

    const error = this.transactionValidation.validate()

    if (error) {
      throw new ValidationError(error.error, error.stack)
    }

    const isEntrance = this.transaction.type === "ENTRANCE"

    const [lastTransaction] = await this.transactionRepository.getLastTransaction(
      this.transaction.userId
    )

    const amount = lastTransaction?.amount || 0

    const newAmount = this.getSumOrSubtractValue(amount, this.transaction.value, isEntrance)

    const transactionAmount = {
      ...this.transaction,
      amount: newAmount,
    }

    const result = await this.transactionRepository.create(transactionAmount)

    if (!result) throw new UnexpectedError()

    return result
  }

  private getSumOrSubtractValue(
    amount: number,
    transactionValue: number,
    isEntrance: boolean
  ): number {
    if (isEntrance) {
      return amount + transactionValue
    }

    const newAmount = (amount -= transactionValue)
    return newAmount
  }
}
