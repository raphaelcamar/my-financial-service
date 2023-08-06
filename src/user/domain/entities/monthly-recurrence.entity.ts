import { Tag } from "./tag.entity"

export class MonthlyRecurrence {
  public title: string
  public _id: string
  public description: string
  public tags: Tag[]
  public value: number
  public expirationDate: Date
  public userId: string

  constructor(data: MonthlyRecurrence.Data) {
    this._id = data._id
    this.title = data.title
    this.description = data.description
    this.tags = data.tags.map(tag => new Tag(tag))
    this.value = data.value
    this.expirationDate = data.expirationDate
    this.userId = data.userId
  }
}

export namespace MonthlyRecurrence {
  export type Data = {
    title: string
    _id: string
    description: string
    tags: Tag[]
    value: number
    expirationDate: Date
    userId: string
  }
}
