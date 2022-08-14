import { MissingParamError } from "@core/generic/domain/errors"

export type PaymentType = "CREDIT_CARD" | "DEBIT_CARD" | "PIX" | "BANCARY_TRANSFER" | "OTHER"

export class Recurrence {
  public _id?: string
  public startDate: Date
  public endDate: Date
  public description?: string
  public type: PaymentType
  public name: string
  public value: number
  public inactivatedAt?: Date
  public recurernceType: "SIGNATURE" | string
  public tagId: string

  constructor(data: Recurrence.Data) {
    this.validate(data)

    this._id = data.id
    this.startDate = data.startDate
    this.endDate = data.endDate
    this.description = data.description
    this.type = data.type
    this.name = data.name
    this.value = data.value
    this.tagId = data.tagId
  }

  private validate?(data: Recurrence.Data) {
    if (!data?.startDate) throw new MissingParamError("Missing startDate")
    if (!data?.endDate) throw new MissingParamError("Missing endDate")
    if (!data?.description) throw new MissingParamError("Missing description")
    if (!data?.type) throw new MissingParamError("Missing type")
    if (!data?.name) throw new MissingParamError("Missing name")
    if (!data?.value) throw new MissingParamError("Missing value")
    if (!data?.tagId) throw new MissingParamError("Missing TagId")
  }
}

export namespace Recurrence {
  export interface Data {
    id?: string
    startDate: Date
    endDate: Date
    description?: string
    type: PaymentType
    name: string
    value: number
    tagId: string
  }
}
