import { Transaction } from "@user/domain/entities"
import { CreateTransaction } from "@user/data/use-cases/transaction"
import { TransactionValidation } from "@user/presenters/validation"
import { InvalidParamError, ValidationError } from "@transaction/domain/errors"
import { makeTransactionSut } from "@user/tests/suts"

describe("Create Transaction", () => {
  it("Should be able to create a transaction", async () => {
    const { transaction, transactionRepository } = makeTransactionSut()
    const transactionValidation = new TransactionValidation(transaction)
    const useCase = new CreateTransaction(transaction, transactionRepository, transactionValidation)

    const result = await useCase.execute()

    expect(result).toHaveProperty("billedAt", transaction.billedAt)
    expect(result).toHaveProperty("topic", transaction.topic)
    expect(result).toHaveProperty("type", transaction.type)
    expect(result).toHaveProperty("userId", transaction.userId)
    expect(result).toHaveProperty("value", transaction.value)
    expect(result).toHaveProperty("_id", transaction._id)
    expect(result).toHaveProperty("anotation", transaction.anotation)
    expect(result).toHaveProperty("coin", transaction.coin)
    expect(result).toHaveProperty("walletId", transaction.walletId)
    expect(result).toHaveProperty("status", transaction.status)
  })

  it("should not be able to create a transaction and throw InvalidParamError", async () => {
    const { transaction, transactionRepository } = makeTransactionSut()

    const transactionValidation = new TransactionValidation(transaction)
    const useCase = new CreateTransaction(null as Transaction, transactionRepository, transactionValidation)

    await expect(useCase.execute()).rejects.toThrow(new InvalidParamError())
  })

  it("Should be able to validate transactions fields", async () => {
    const validator = new TransactionValidation({} as Transaction)

    const result = validator.validate()
    expect(result.stack.length).toEqual(8)
  })

  it("Should not be able create transaction and throw ValidationError", async () => {
    const { transactionRepository } = makeTransactionSut()
    const transaction = {} as Transaction
    const transactionValidation = new TransactionValidation(transaction)
    const { error, stack } = transactionValidation.validate()
    const useCase = new CreateTransaction(transaction, transactionRepository, transactionValidation)

    await expect(useCase.execute()).rejects.toThrow(new ValidationError(error, stack))
  })
})
