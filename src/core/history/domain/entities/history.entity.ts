import { MissingParamError } from "@core/domain/errors"

export type ContextType = "User" | "Transaction"

export class History<T> {
  public _id?: string
  public context: ContextType
  public occurrenceDate: Date
  public summary: string
  public userId: string
  public metadata?: T

  constructor(private data: History.Data<T>) {
    this.validate(data)

    this._id = data?._id
    this.context = data?.context
    this.occurrenceDate = data?.occurrenceDate
    this.summary = data?.summary
    this.userId = data?.userId
    this.metadata = data?.metadata
  }

  validate(data: History.Data<T>): void {
    if (!data?.context) throw new MissingParamError("Missing context")
    if (!data?.occurrenceDate) throw new MissingParamError("Missing ocurrenceDate")
    if (!data?.summary) throw new MissingParamError("Missing summary")
    if (!data?.userId) throw new MissingParamError("Missing userId")
  }
}

export namespace History {
  export interface Data<T> {
    _id?: string
    context: ContextType
    occurrenceDate: Date
    summary: string
    userId: string
    metadata?: T | any
  }
}
