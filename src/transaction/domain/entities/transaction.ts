export type TypeTransaction = "ENTRANCE" | "SPENT"

export interface Transaction {
  _id?: string
  userId: string
  billedAt: Date
  createdAt?: Date
  anotation?: string
  type: TypeTransaction
  updatedAt?: Date
  value: number
  amount?: number
  topic: "FOOD" | "TRANSPORT" | "HEALTH" | "OTHER"
}
