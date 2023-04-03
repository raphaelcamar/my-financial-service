import { Transaction } from "./transaction.entity"

export class MonthlyClosing {
  id?: string
  userId: string
  walletId: string
  totalSpents?: number
  totalEntrance?: number
  balance?: number
  aditionalInformation?: string
  month: number
  year: number
  transactions: string[]

  constructor(data: MonthlyClosing.Data) {
    this.aditionalInformation = data.aditionalInformation
    this.userId = data.userId
    this.walletId = data.walletId
    this.totalSpents = data.totalSpents
    this.totalEntrance = data.totalEntrance
    this.balance = data.balance
    this.month = data.month
    this.year = data.year
    this.transactions = data.transactions
  }
}

export namespace MonthlyClosing {
  export type Data = typeof MonthlyClosing.prototype
}
