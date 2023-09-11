export type TagStatus = "active" | "inactive"

export class Tag {
  public _id?: string
  public description: string
  public color: string
  public title: string
  public inactivatedAt?: Date
  public userId: string
  public shade: string
  public totalLinked?: number

  constructor(data: Tag.Data) {
    this._id = data?._id
    this.color = data.color
    this.description = data.description
    this.inactivatedAt = data?.inactivatedAt
    this.userId = data.userId
    this.title = data.title
    this.shade = data.shade
    this.totalLinked = data.totalLinked?.length || 0
  }
}

export namespace Tag {
  export interface Data {
    _id?: string
    description: string
    color: string
    title: string
    inactivatedAt?: Date
    userId: string
    shade: string
    totalLinked?: Array<unknown>
  }
}
