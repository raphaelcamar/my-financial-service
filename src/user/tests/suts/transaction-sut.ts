import { Transaction } from "@user/domain/entities"
import { TransactionBuilder } from "@transaction/builders"
import { TransactionRepositorySpy } from "@user/tests/mocks"
import { TransactionProtocol } from "@user/data/protocols"

type MakeSutType = {
  transaction: Transaction
  transactionRepository: TransactionProtocol
}

export const makeTransactionSut = (): MakeSutType => {
  const transaction = new TransactionBuilder().withoutField(["amount"]).data
  const transactionRepository = new TransactionRepositorySpy()

  return {
    transaction,
    transactionRepository,
  }
}
