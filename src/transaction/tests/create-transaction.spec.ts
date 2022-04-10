import { TransactionBuilder } from "@transaction/builders"
import { TransactionFactory } from "@transaction/data/factories"
import { Transaction } from "@transaction/domain"
import { TransactionValidation } from "@transaction/presenters/validation"
import { TransactionRepositorySpy, ReminderRepositorySpy } from "@transaction/tests/mocks"

const makeSut = () => {
  const transaction = new TransactionBuilder().withoutField(["amount"]).data
  const transactionRepository = new TransactionRepositorySpy()
  const reminderRepository = new ReminderRepositorySpy()

  return {
    transaction,
    reminderRepository,
    transactionRepository,
    data: transactionRepository.data,
  }
}

describe("CreateTransaction", () => {
  it("Should be able to create a transaction", async () => {
    const { transaction, reminderRepository, transactionRepository } = makeSut()
    const data = { ...transaction, amount: 1 }
    const factory = new TransactionFactory(data, transactionRepository, reminderRepository)

    const useCase = factory.execute()
    const transactionData = await useCase.execute()

    expect(transactionData).toHaveProperty("amount", transactionData.amount)
  })

  it("Should be able to create a transaction and add a value into amount", async () => {
    const { transaction, reminderRepository, transactionRepository } = makeSut()

    const data: Transaction = { ...transaction, type: "ENTRANCE" }

    const factory = new TransactionFactory(data, transactionRepository, reminderRepository)

    const useCase = factory.execute()
    const transactionData = await useCase.execute()
    const secondTransaction = await useCase.execute()

    expect(secondTransaction).toHaveProperty("amount", transactionData.amount * 2)
  })

  it("Should be able to create a transaction and subtract amount value", async () => {
    const { transaction, reminderRepository, transactionRepository } = makeSut()

    const data: Transaction = { ...transaction, type: "SPENT" }

    const factory = new TransactionFactory(data, transactionRepository, reminderRepository)

    const useCase = factory.execute()
    const secondTransaction = await useCase.execute()
    const isNegative = secondTransaction.amount < 0

    expect(isNegative).toBeTruthy()
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
