import { Transaction } from "./transaction"

export type Status = "POSITIVE" | "NEGATIVE"

export interface MonthlyClose extends Transaction {
  monthlyValue: number
  differencePercentage: number
  startMonthlyDate: Date
  endMonthlyDate: Date
  status: Status
  transactions: Transaction[]
}
