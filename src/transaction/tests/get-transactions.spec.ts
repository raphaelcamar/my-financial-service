import { GetTransactions } from "@transaction/data"
import { isEqual } from "date-fns"
import { TransactionRepositorySpy } from "./mocks"

const makeSut = () => {
  const transactionRepository = new TransactionRepositorySpy()

  return {
    transactionRepository,
  }
}

describe("Get transactions", () => {
  it("Should be able to get all transactions", async () => {
    const userId = "1234"
    const { transactionRepository } = makeSut()

    const useCase = new GetTransactions(userId, transactionRepository)

    const result = await useCase.execute()

    const firstResult = result?.[0]

    const isDateEqual = isEqual(firstResult.createdAt, new Date())

    expect(isDateEqual).toBeTruthy()
  })
})
