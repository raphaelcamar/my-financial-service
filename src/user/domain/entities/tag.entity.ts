export type TagStatus = "active" | "inactive"

export class Tag {
  public _id?: string
  public description: string
  public color: string
  public title: string
  public inactivatedAt?: Date
  public userId: string

  constructor(data: Tag.Data) {
    this._id = data?._id
    this.color = data.color
    this.description = data.description
    this.inactivatedAt = data?.inactivatedAt
    this.userId = data.userId
    this.title = data.title
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
  }
}
