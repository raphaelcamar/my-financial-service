import { Transaction } from "./transaction.entity"

export class MonthlyClosing {
  id?: string
  userId: string
  walletId: string
  totalSpents?: number
  initialBalance?: number
  finalBalance?: number
  aditionalInformation?: string
  month: number
  year: number
  transactions: string[]

  constructor(data: MonthlyClosing.Data) {
    this.aditionalInformation = data.aditionalInformation
    this.userId = data.userId
    this.walletId = data.walletId
    this.totalSpents = data.totalSpents
    this.initialBalance = data.initialBalance
    this.finalBalance = data.finalBalance
    this.month = data.month
    this.year = data.year
    this.transactions = data.transactions
  }
}

export namespace MonthlyClosing {
  export type Data = typeof MonthlyClosing.prototype
}
