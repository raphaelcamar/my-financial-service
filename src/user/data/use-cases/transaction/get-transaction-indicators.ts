import { UseCase } from "@core/generic/data/protocols"
import { TransactionProtocol } from "@user/data/protocols"
import { Transaction } from "@user/domain/entities"

export class GetTransactionIndicators implements UseCase<Transaction.Indicator> {
  constructor(private userId: string, private walletId: string, private month: number, private transactionRepository: TransactionProtocol) {}

  async execute(): Promise<Transaction.Indicator> {
    const query = this.getFilter()
    const result = await this.transactionRepository.getTransactionIndicators(this.userId, this.walletId, query)

    if (!result) {
      return {
        entrance: {
          differencePercentage: 0,
          value: 0,
        },
        spent: {
          differencePercentage: 0,
          value: 0,
        },
      }
    }
    return result
  }

  private getFilter(): { $lte: any; $gte: any } {
    const date = new Date()
    const firstDay = new Date(date.getFullYear(), this.month - 1, 1)
    const lastDay = new Date(date.getFullYear(), this.month, 0)

    return {
      $lte: lastDay,
      $gte: firstDay,
    }
  }
}
