import { MissingParamError } from "@core/generic/domain/errors"

export type TypeTransaction = "ENTRANCE" | "SPENT"

type IndicatorType = {
  value: number
  differencePercentage: number
}

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
  topic: "FOOD" | "TRANSPORT" | "HEALTH" | "OTHER"

  constructor(data: Transaction.Data) {
    this.validate(data)

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
    topic: "FOOD" | "TRANSPORT" | "HEALTH" | "OTHER"
  }

  export interface Filter {
    start?: string
    limit?: string
  }

  export interface Indicator {
    entrance: IndicatorType
    spent: IndicatorType
  }
}
