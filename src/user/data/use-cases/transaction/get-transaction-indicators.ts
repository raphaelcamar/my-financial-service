import { UseCase } from "@core/generic/data/protocols"
import { TransactionProtocol } from "@user/data/protocols"
import { MonthlyClosing, Transaction } from "@user/domain/entities"

export class GetTransactionIndicators implements UseCase<Transaction.Indicator> {
  constructor(
    private userId: string,
    private walletId: string,
    private month: number,
    private transactionRepository: TransactionProtocol,
    private previousMonthlyClosing: MonthlyClosing | null
  ) {}

  async execute(): Promise<Transaction.Indicator> {
    const query = this.getFilter()
    const result = await this.transactionRepository.getTransactionIndicators(this.userId, this.walletId, query)

    if (!result) {
      return {
        entrance: {
          differencePercentage: 0,
          value: 0,
          differenceValue: 0,
        },
        spent: {
          differencePercentage: 0,
          value: 0,
          differenceValue: 0,
        },
      }
    }

    const entranceDifference = this.getDifferenceValue(result.entrance.value, this.previousMonthlyClosing?.totalEntrance || 0)
    const spentDifference = this.getDifferenceValue(result.spent.value, this.previousMonthlyClosing?.totalSpents || 0)

    const entrancePercentage = this.getDifferencePercentage(result.entrance.value, this.previousMonthlyClosing?.totalEntrance || 1)
    const spentPercentage = this.getDifferencePercentage(result.spent.value, this.previousMonthlyClosing?.totalSpents || 1)

    return {
      entrance: {
        differencePercentage: entrancePercentage,
        value: result.entrance.value,
        differenceValue: entranceDifference,
      },
      spent: {
        differencePercentage: spentPercentage,
        value: result.spent.value,
        differenceValue: spentDifference,
      },
    }
  }

  private getFilter(): { $lte: Date; $gte: Date } {
    const date = new Date()
    const firstDay = new Date(date.getFullYear(), this.month - 1, 1)
    const lastDay = new Date(date.getFullYear(), this.month, 0)

    return {
      $lte: lastDay,
      $gte: firstDay,
    }
  }

  private getDifferenceValue(currentMonth: number, previousMonth: number): number {
    return currentMonth - previousMonth
  }

  private getDifferencePercentage(currentMonth: number, previousMonth: number): number {
    const subtractValues = previousMonth - currentMonth
    const divide = subtractValues / previousMonth

    const percentage = divide * 100
    return percentage
  }
}
