import { TransactionFactory } from "@transaction/data/factories"
import { Transaction } from "@transaction/domain"
import { TransactionValidation } from "@transaction/presenters/validation"
import { TransactionRepositorySpy, ReminderRepositorySpy } from "@transaction/tests/mocks"

const makeSut = () => {
  const transaction: Transaction = {
    billedAt: new Date(),
    topic: "OTHER",
    type: "ENTRANCE",
    userId: "",
    value: 12.5,
    anotation: "Test sut case",
  }

  const transactionRepository = new TransactionRepositorySpy()
  const reminderRepository = new ReminderRepositorySpy()

  return {
    transaction,
    reminderRepository,
    transactionRepository,
  }
}

describe("CreateTransaction", () => {
  it("Should be able to create a transaction", async () => {
    const { transaction, reminderRepository, transactionRepository } = makeSut()

    const factory = new TransactionFactory(transaction, transactionRepository, reminderRepository)

    const useCase = factory.execute()
    const result = await useCase.execute()

    expect(result).not.toHaveProperty("isCancelled")
  })

  it("Should not be able to create a transaction and throw ValidationError", async () => {
    const validator = new TransactionValidation({} as Transaction)

    const result = validator.validate()
    expect(result.stack.length).toEqual(5)
  })

  it("Should be able to create a reminder", async () => {
    const { transaction, reminderRepository, transactionRepository } = makeSut()
    const year = new Date().getFullYear() + 1
    const transactionReminder = { ...transaction, billedAt: new Date(year, 1, 1) }

    const factory = new TransactionFactory(
      transactionReminder,
      transactionRepository,
      reminderRepository
    )
    const useCase = factory.execute()

    const result = await useCase.execute()
    expect(result).toHaveProperty("isCancelled")
  })
})
