import { Transaction } from "@transaction/domain/entities"
import { TransactionValidation } from "@transaction/presenters/validation"
import { TransactionBuilder } from "@transaction/builders"
import { CreateTransaction, GetTransactions } from "@transaction/data/use-cases"
import { isSameMonth } from "date-fns"
import { TransactionRepositorySpy } from "./mocks"

const makeSut = () => {
  const transaction = new TransactionBuilder().data
  const transactionRepositorySpy = new TransactionRepositorySpy()

  return {
    transaction,
    transactionRepositorySpy,
  }
}

describe("Get transactions", () => {
  it("Should be able to get all transactions of the current user", async () => {
    const { transactionRepositorySpy, transaction } = makeSut()

    const transactionValidation = new TransactionValidation(transaction)
    const createTransactionUseCase = new CreateTransaction(
      transaction,
      transactionRepositorySpy,
      transactionValidation
    )

    const createTransactionUseCaseWithOtherId = new CreateTransaction(
      new Transaction({ ...transaction, userId: "12346" }),
      transactionRepositorySpy,
      transactionValidation
    )

    await createTransactionUseCase.execute()
    await createTransactionUseCase.execute()
    await createTransactionUseCase.execute()
    await createTransactionUseCaseWithOtherId.execute()
    await createTransactionUseCaseWithOtherId.execute()

    const useCase = new GetTransactions(transaction.userId, transactionRepositorySpy)

    const result = await useCase.execute()

    expect(result.length).toEqual(3)
  })

  it("Should not be able to get all transactions of the current user", async () => {
    const { transactionRepositorySpy, transaction } = makeSut()

    const transactionValidation = new TransactionValidation(transaction)
    const createTransactionUseCase = new CreateTransaction(
      transaction,
      transactionRepositorySpy,
      transactionValidation
    )

    await createTransactionUseCase.execute()
    await createTransactionUseCase.execute()
    await createTransactionUseCase.execute()

    const useCase = new GetTransactions("randomId", transactionRepositorySpy)

    const result = await useCase.execute()

    expect(result.length).toEqual(0)
  })

  it("Should be able to get all transactions for the current month", async () => {
    const { transactionRepositorySpy, transaction } = makeSut()

    let lastMonth = new Date().getMonth() - 1
    const year = new Date().getFullYear()

    lastMonth = lastMonth < 0 ? 11 : lastMonth

    const lastMonthTransaction = new Transaction({
      ...transaction,
      billedAt: new Date(year, lastMonth, lastMonth),
    })

    const transactionValidation = new TransactionValidation(transaction)

    const createTransactionUseCase = new CreateTransaction(
      lastMonthTransaction,
      transactionRepositorySpy,
      transactionValidation
    )

    const currentMonthTransactionsUseCase = new CreateTransaction(
      transaction,
      transactionRepositorySpy,
      transactionValidation
    )

    await createTransactionUseCase.execute()
    await createTransactionUseCase.execute()
    await createTransactionUseCase.execute()
    await currentMonthTransactionsUseCase.execute()
    await currentMonthTransactionsUseCase.execute()

    const useCase = new GetTransactions(transaction.userId, transactionRepositorySpy)

    const result = await useCase.execute()

    expect(result.length).toEqual(2)
  })
})
