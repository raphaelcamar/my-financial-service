import { Transaction } from "@transaction/domain/entities"
import { TransactionBuilder } from "@transaction/builders"
import { GetAverage } from "@transaction/data/use-cases"
import { makeSut } from "./base-sut"

describe("Get Average statistic", () => {
  test("Should be able to get average spent of transactions", () => {
    const { transactionRepository, transaction } = makeSut()

    const values = {
      1: -100,
      2: 500,
      3: -100,
      4: 400,
    }

    const useCase = new GetAverage("134", transactionRepository, {})
    const transaction1: Transaction.Data = {
      ...new TransactionBuilder().build(),
      value: values[1],
      type: "SPENT",
    }
    const transaction2: Transaction.Data = {
      ...new TransactionBuilder().build(),
      value: values[2],
      type: "ENTRANCE",
    }
    const transaction3: Transaction.Data = {
      ...transaction,
      value: values[3],
      type: "SPENT",
    }
    const transaction4: Transaction.Data = {
      ...transaction,
      value: values[4],
      type: "SPENT",
    }

    const total = values[1] + values[3] + values[4]

    const transactions = [transaction1, transaction2, transaction3, transaction4]

    const result = useCase.getAverage(transactions)
    expect(result).toBe(total / 3)
  })
})
