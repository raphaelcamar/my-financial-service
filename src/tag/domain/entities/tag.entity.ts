import { MissingParamError } from "@core/generic/domain/errors"

export class Tag<T = {}> {
  public _id?: string
  public description: string
  public color: string
  public title: string
  public inactivatedAt?: Date
  public metadata: T
  public userId: string

  constructor(data: Tag.Data<T>) {
    this.validate(data)

    this._id = data?._id
    this.color = data.color
    this.description = data.description
    this.inactivatedAt = data?.inactivatedAt
    this.metadata = data?.metadata
    this.userId = data.userId
    this.title = data.title
  }

  private validate?(data: Tag.Data<T>): void {
    if (!data?.description) throw new MissingParamError("Missing description")
    if (!data?.color) throw new MissingParamError("Missing color")
    if (!data?.title) throw new MissingParamError("Missing title")
    if (!data?.userId) throw new MissingParamError("Missing userId")
  }
}

export namespace Tag {
  export interface Data<T = {}> {
    _id?: string
    description: string
    color: string
    title: string
    inactivatedAt?: Date
    metadata?: T
    userId: string
  }
}
