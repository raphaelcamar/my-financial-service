import { TransactionBuilder } from "@transaction/builders"
import { GetTotalFilter } from "@transaction/data/use-cases"
import { makeSut } from "./base-sut"

describe("Get total filter", () => {
  test("Should be able to search total", () => {
    const { transactionRepository } = makeSut()

    const useCase = new GetTotalFilter("134", transactionRepository, {})
    const transaction1 = { ...new TransactionBuilder().build(), value: 100 }
    const transaction2 = { ...new TransactionBuilder().build(), value: 500 }
    const transaction3 = { ...new TransactionBuilder().build(), value: -100 }
    const transactions = [transaction1, transaction2, transaction3]

    const result = useCase.getTotal(transactions)
    expect(result).toBe(500)
  })

  test("Should not be able to search total and return 0", () => {
    const { transactionRepository } = makeSut()

    const useCase = new GetTotalFilter("134", transactionRepository, {})

    const result = useCase.getTotal([])
    expect(result).toBe(0)
  })
})
