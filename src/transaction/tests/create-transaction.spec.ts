import { Transaction } from "@transaction/domain/entities"
import { CreateTransaction } from "@transaction/data/use-cases"
import { TransactionValidation } from "@transaction/presenters/validation"
import { InvalidParamError, ValidationError } from "@transaction/domain/errors"
import { makeSut } from "./base-sut"

describe("Create Transaction", () => {
  it("Should be able to create a transaction", async () => {
    const { transaction, transactionRepository } = makeSut()
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
  })

  it("should not be able to create a transaction and throw InvalidParamError", async () => {
    const { transaction, transactionRepository } = makeSut()

    const transactionValidation = new TransactionValidation(transaction)
    const useCase = new CreateTransaction(null, transactionRepository, transactionValidation)

    await expect(useCase.execute()).rejects.toThrow(InvalidParamError)
  })

  it("Should be able to validate transactions fields", async () => {
    const validator = new TransactionValidation({} as Transaction)

    const result = validator.validate()
    expect(result.stack.length).toEqual(5)
  })

  it("Should not be able create transaction and throw ValidationError", async () => {
    const { transactionRepository } = makeSut()
    const transaction = {} as Transaction
    const transactionValidation = new TransactionValidation(transaction)

    const useCase = new CreateTransaction(transaction, transactionRepository, transactionValidation)

    await expect(useCase.execute()).rejects.toThrow(ValidationError)
  })
})
