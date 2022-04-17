import { TransactionRepository } from "@transaction/data/protocols"
import { Transaction } from "@transaction/domain/entities"
import { TransactionBuilder } from "@transaction/builders"
import { TransactionRepositorySpy } from "./mocks"

type MakeSutType = {
  transaction: Transaction
  transactionRepository: TransactionRepository
}

export const makeSut = (): MakeSutType => {
  const transaction = new TransactionBuilder().withoutField(["amount"]).data
  const transactionRepository = new TransactionRepositorySpy()

  return {
    transaction,
    transactionRepository,
  }
}
