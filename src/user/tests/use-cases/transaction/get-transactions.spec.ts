import { Transaction } from "@user/domain/entities"
import { TransactionValidation } from "@user/presenters/validation"
import { TransactionBuilder } from "@user/builders"
import { CreateTransaction, GetTransactions } from "@user/data/use-cases/transaction"
import { TransactionRepositorySpy } from "@user/tests/mocks"
import { InvalidUserIdError } from "@user/domain/errors"

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
    const createTransactionUseCase = new CreateTransaction(transaction, transactionRepositorySpy, transactionValidation)

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

    const useCase = new GetTransactions(
      transaction.userId,
      transactionRepositorySpy,
      {
        limit: "",
        start: "",
      },
      transaction.walletId
    )

    const result = await useCase.execute()

    expect(result.length).toEqual(3)
  })

  it("Should not be able to search transactions, and throw InvalidUserIdError", async () => {
    const { transactionRepositorySpy, transaction } = makeSut()

    const useCase = new GetTransactions(
      null,
      transactionRepositorySpy,
      {
        limit: "",
        start: "",
      },
      transaction.walletId
    )

    await expect(useCase.execute()).rejects.toThrow(new InvalidUserIdError())
  })

  it("Should be able to return a query according to the filter", () => {
    const { transactionRepositorySpy, transaction } = makeSut()

    const filters: Transaction.Filter = {
      limit: new Date().toISOString(),
      start: new Date().toISOString(),
    }

    const useCase = new GetTransactions(transaction.userId, transactionRepositorySpy, filters, transaction.walletId)

    const createdFilter = useCase.getFilters(filters)

    expect(createdFilter).toHaveProperty("$gte")
    expect(createdFilter).toHaveProperty("$lte")
  })

  it("Should not be able to get the filters and return null", () => {
    const { transactionRepositorySpy, transaction } = makeSut()

    const filters: Transaction.Filter = null

    const useCase = new GetTransactions(transaction.userId, transactionRepositorySpy, filters, transaction.walletId)

    const createdFilter = useCase.getFilters(filters)

    expect(createdFilter).toBe(null)
  })
})
