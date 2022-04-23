import { Transaction } from "./transaction"

export type Status = "POSITIVE" | "NEGATIVE"

export interface MonthlyClose {
  userId: string
  monthlyValue: number
  differencePercentage: number
  startMonthlyDate: Date
  endMonthlyDate: Date
  status: Status
  transactions: Transaction[]
}

export type Months = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12"
