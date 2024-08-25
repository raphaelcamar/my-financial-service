import { TypeTransaction } from "@transaction/domain/entities"
import { Tag } from "./tag.entity"

export class MonthlyRecurrence {
  public title: string
  public _id: string
  public description: string
  public tags: Tag[]
  public value: number
  public expirationDate: Date
  public userId: string
  public dueDate: number
  public paymentType: "CREDIT" | "DEBIT" | "BANK_SLIP" | "OTHER"
  public walletId: string
  public inactivatedAt?: Date
  public type: TypeTransaction

  constructor(data: MonthlyRecurrence.Data) {
    this._id = data._id
    this.title = data.title
    this.description = data.description
    this.tags = data.tags.map(tag => new Tag(tag))
    this.value = data.value
    this.expirationDate = data.expirationDate
    this.userId = data.userId
    this.dueDate = data.dueDate
    this.walletId = data.walletId
    this.paymentType = data.paymentType
    this.inactivatedAt = data.inactivatedAt && new Date(data.inactivatedAt)
    this.type = data.type
  }
}

export namespace MonthlyRecurrence {
  export type Data = {
    title: string
    _id: string
    description: string
    tags: Tag.Data[]
    value: number
    expirationDate: Date
    userId: string
    type: TypeTransaction
    dueDate: number
    paymentType: "CREDIT" | "DEBIT" | "BANK_SLIP" | "OTHER"
    walletId: string
    inactivatedAt?: Date
  }
}
