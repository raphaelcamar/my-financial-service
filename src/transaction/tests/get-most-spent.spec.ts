import { Transaction } from "@transaction/domain/entities"
import { TransactionBuilder } from "@transaction/builders"
import { GetMostSpent } from "@transaction/data/use-cases"
import { makeSut } from "./base-sut"

describe("Get most spent", () => {
  it("Should be able to get the most spent", () => {
    const { transactionRepository, transaction } = makeSut()

    const useCase = new GetMostSpent("134", transactionRepository, {})
    const transaction1: Transaction.Data = {
      ...new TransactionBuilder().build(),
      value: -100.2,
      type: "SPENT",
    }
    const transaction2: Transaction.Data = {
      ...new TransactionBuilder().build(),
      value: -50.0,
      type: "SPENT",
    }
    const transaction3: Transaction.Data = {
      ...transaction,
      value: -100.3,
      type: "SPENT",
    }
    const transactions = [transaction1, transaction2, transaction3]

    const result = useCase.getMostSpent(transactions)
    expect(result).toBe(transaction3)
  })

  it("Should not be able to get the most spent and return null", () => {
    const { transactionRepository } = makeSut()

    const useCase = new GetMostSpent("134", transactionRepository, {})
    const result = useCase.getMostSpent([])

    expect(result).toBe(null)
  })
})
