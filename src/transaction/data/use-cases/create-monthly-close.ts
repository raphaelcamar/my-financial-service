import { TransactionRepository } from "@transaction/data/protocols"
import { MonthlyCloseRepository } from "@transaction/data/protocols/monthly-close-repository"
import { UseCase } from "@core/generic/data/protocols"
import { MonthlyClose, Transaction } from "@transaction/domain/entities"
import { endOfMonth, format, startOfMonth, subMonths } from "date-fns"

export class CreateMonthlyClose implements UseCase<MonthlyClose> {
  constructor(private monthlyCloseRepository: MonthlyCloseRepository, private userId: string, private transactionRepository: TransactionRepository) {}

  async execute(): Promise<MonthlyClose> {
    const start = startOfMonth(new Date())
    const end = endOfMonth(new Date())

    const currentMonthTransactions = await this.getCurrentMonthsData()
    const lastMonthTransactions = await this.getLastMonthsData()

    const lastMonthlyValue = lastMonthTransactions?.[0]?.amount || 1
    const currentMonthlyValue = currentMonthTransactions?.[0]?.amount || 1

    const differencePercentage = this.calculateDifferencePercentage(lastMonthlyValue, currentMonthlyValue)

    const createMonthlyClose: MonthlyClose = {
      differencePercentage,
      endMonthlyDate: end,
      startMonthlyDate: start,
      monthlyValue: currentMonthlyValue,
      status: differencePercentage < 0 ? "NEGATIVE" : "POSITIVE",
      transactions: currentMonthTransactions,
      userId: this.userId,
    }

    const monthlyClose = await this.monthlyCloseRepository.create(createMonthlyClose)

    return monthlyClose
  }

  async getLastMonthsData(): Promise<Transaction[]> {
    const lastMonth = subMonths(new Date(), 1)

    const start = format(startOfMonth(lastMonth), "dd/MM/yyyy")
    const end = format(endOfMonth(lastMonth), "dd/MM/yyyy")

    const lastMonthTransactions = await this.transactionRepository.getTransactions(this.userId, {
      start,
      end,
    })

    return lastMonthTransactions
  }

  async getCurrentMonthsData(): Promise<Transaction[]> {
    const start = format(startOfMonth(new Date()), "dd/MM/yyyy")
    const end = format(endOfMonth(new Date()), "dd/MM/yyyy")

    const currentMonthTransactions = await this.transactionRepository.getTransactions(this.userId, {
      start,
      end,
    })

    return currentMonthTransactions
  }

  calculateDifferencePercentage(lastMonth: number, currentMonth: number): number {
    const subtractValues = lastMonth - currentMonth

    const divide = subtractValues / lastMonth

    const percentage = divide * 100

    return percentage
  }
}
