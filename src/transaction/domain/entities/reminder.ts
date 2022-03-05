import { Transaction } from "./transaction"

export interface Reminder extends Transaction {
  isCancelled?: boolean
}
