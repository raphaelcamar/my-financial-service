import { MissingParamError } from "@core/generic/domain/errors"

export type TypeTransaction = "ENTRANCE" | "SPENT"

type IndicatorType = {
  value: number
  differencePercentage: number
  differenceValue?: number
}

export type StatusType = "FINISHED" | "PENDING"
export type CoinType = "USD" | "BRL" | "EUR" | "ARS" | "GBP" | "JPY" | "CNY" | "AUD" | "CAD" | "CHF" | "NZD"

export type PaymentType = "CREDIT" | "DEBIT" | "MONEY" | "PIX" | "TRANSFER" | "CRYPTO" | "BANK_SLIP" | "OTHER"

export class Transaction {
  _id?: string
  userId: string
  billedAt: Date
  createdAt?: Date
  anotation?: string
  type: TypeTransaction
  updatedAt?: Date
  value: number
  amount?: number
  walletId: string
  topic: "FOOD" | "TRANSPORT" | "HEALTH" | "OTHER" | "MONTHLY_RECURRENCE"
  coin: CoinType
  status: StatusType
  paymentType: PaymentType

  constructor(data: Transaction.Data) {
    // this.validate(data)

    this._id = data?._id
    this.userId = data?.userId
    this.billedAt = data?.billedAt
    this.createdAt = data?.createdAt
    this.anotation = data?.anotation
    this.type = data?.type
    this.updatedAt = data?.updatedAt
    this.value = data?.value
    this.amount = data?.amount
    this.topic = data?.topic
    this.walletId = data?.walletId
    this.status = data?.status
    this.coin = data?.coin
    this.paymentType = data.paymentType
  }

  validate(data: Transaction.Data): void {
    if (!data?.userId) throw new MissingParamError("Missing userId")
    if (!data?.billedAt) throw new MissingParamError("Missing billedAt")
    if (!data?.type) throw new MissingParamError("Missing type")
    if (!data?.value) throw new MissingParamError("Missing value")
    if (!data?.topic) throw new MissingParamError("Missing topic")
    if (!data?.walletId) throw new MissingParamError("Missing walletId")
  }
}

export namespace Transaction {
  export interface Data {
    _id?: string
    userId: string
    billedAt: Date
    createdAt?: Date
    anotation?: string
    type: TypeTransaction
    updatedAt?: Date
    value: number
    walletId: string
    amount?: number
    topic: "FOOD" | "TRANSPORT" | "HEALTH" | "OTHER" | "MONTHLY_RECURRENCE"
    coin: CoinType
    status: StatusType
    paymentType: PaymentType
  }

  export interface Filter {
    start?: string
    limit?: string
    page?: number
  }

  export interface Indicator {
    entrance: IndicatorType
    spent: IndicatorType
  }
}
