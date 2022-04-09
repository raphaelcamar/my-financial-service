import { Transaction } from "@transaction/domain"
import { Transaction as TransactionSchema } from "@transaction/infra/db/schemas"
import { startOfMonth, endOfMonth } from "date-fns"

export class TransactionRepositoryData {
  async create(transaction: Transaction): Promise<Transaction> {
    const transactionLast = (await TransactionSchema.find({
      createdAt: {
        $gte: startOfMonth(new Date()),
        $lte: endOfMonth(new Date()),
      },
    })
      .sort({ $natural: -1 })
      .limit(1)) as Transaction[]

    const transactionAmount = {
      ...transaction,
      amount: (transactionLast?.[0]?.amount || 0) + transaction.value,
    }

    const transactionSchema = new TransactionSchema(transactionAmount)

    const result = await transactionSchema.save()
    return result
  }

  async getTransactions(userId: string): Promise<Transaction[]> {
    const transactions: Transaction[] = await TransactionSchema.find({ userId })
      .sort({ $natural: -1 })
      .lean()

    return transactions
  }
}
