import { Transaction } from "@transaction/domain/entities"
import { TransactionValidation } from "@transaction/presenters/validation"
import { TransactionBuilder } from "@transaction/builders"
import { CreateTransaction, GetTransactions } from "@transaction/data/use-cases"
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

    const useCase = new GetTransactions(transaction.userId, transactionRepositorySpy, {
      limit: "",
      start: "",
    })

    const result = await useCase.execute()

    expect(result.length).toEqual(3)
  })

  it("Should be able to return a query according to the filter", () => {
    const { transactionRepositorySpy, transaction } = makeSut()

    const filters: Transaction.Filter = {
      limit: new Date().toISOString(),
      start: new Date().toISOString(),
    }

    const useCase = new GetTransactions(transaction.userId, transactionRepositorySpy, filters)

    const createdFilter = useCase.getFilters(filters)

    expect(createdFilter).toHaveProperty("$gte")
    expect(createdFilter).toHaveProperty("$lte")
  })

  it("Should no be able to gt the filters and return null", () => {
    const { transactionRepositorySpy, transaction } = makeSut()

    const filters: Transaction.Filter = null

    const useCase = new GetTransactions(transaction.userId, transactionRepositorySpy, filters)

    const createdFilter = useCase.getFilters(filters)

    expect(createdFilter).toBe(null)
  })

  it("Should not be able to get all transactions of the current user", async () => {
    const { transactionRepositorySpy, transaction } = makeSut()

    const transactionValidation = new TransactionValidation(transaction)
    const createTransactionUseCase = new CreateTransaction(transaction, transactionRepositorySpy, transactionValidation)

    await createTransactionUseCase.execute()
    await createTransactionUseCase.execute()
    await createTransactionUseCase.execute()

    const useCase = new GetTransactions("randomId", transactionRepositorySpy, {
      limit: "",
      start: "",
    })

    const result = await useCase.execute()

    expect(result.length).toEqual(0)
  })
})
