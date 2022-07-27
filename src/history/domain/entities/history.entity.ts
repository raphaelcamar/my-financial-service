import { MissingParamError } from "@core/generic/domain/errors"

export type ContextType = "USER" | "TRANSACTION"

export type Action = "CREATE" | "EDIT" | "DELETE" | "UPDATE"

export type GeneratedBy = "SYSTEM" | "USER"

export class History<T, K = void> {
  public _id?: string
  public context: ContextType
  public occurrenceDate: Date
  public summary: string
  public userId: string
  public metadata?: T
  public generatedBy: GeneratedBy
  public action?: Action | K

  constructor(private data: History.Data<T, K>) {
    this.validate(data)

    this._id = this.data?._id
    this.context = this.data?.context
    this.occurrenceDate = this.data?.occurrenceDate
    this.summary = this.data?.summary
    this.userId = this.data?.userId
    this.metadata = this.data?.metadata
    this.generatedBy = this.data?.generatedBy
    this.action = this.data?.action
  }

  validate(data: History.Data<T, K>): void {
    if (!data?.context) throw new MissingParamError("Missing context")
    if (!data?.occurrenceDate) throw new MissingParamError("Missing ocurrenceDate")
    if (!data?.summary) throw new MissingParamError("Missing summary")
    if (!data?.userId) throw new MissingParamError("Missing userId")
  }
}

export namespace History {
  export interface Data<T, K = void> {
    _id?: string
    context: ContextType
    occurrenceDate: Date
    summary: string
    userId: string
    metadata?: T | any
    generatedBy: GeneratedBy
    action: Action | K
  }
}
