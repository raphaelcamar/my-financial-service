import { MissingParamError } from "@core/generic/domain/errors"

export class User {
  public _id?: string
  public createdAt?: Date
  public email: string
  public lastname: string
  public name: string
  public password: string
  public token: string
  public updatedAt?: Date
  public codeRecover?: number

  constructor(private data: User.Data) {
    this.validate(data)

    this._id = data._id
    this.createdAt = data?.createdAt || null
    this.email = data.email
    this.lastname = data.lastname
    this.name = data.name
    this.password = data.password
    this.token = data.token
    this.updatedAt = data?.updatedAt || null
    this.codeRecover = data?.codeRecover
  }

  validate(data: User.Data): void {
    if (!data?.name) throw new MissingParamError("Missing name")
    if (!data?.lastname) throw new MissingParamError("Missing lastname")
    if (!data?.password) throw new MissingParamError("Missing password")
    if (!data?.email) throw new MissingParamError("Missing email")
  }
}

export namespace User {
  export interface Data {
    _id?: string
    createdAt?: Date
    email: string
    lastname: string
    name: string
    password: string
    token: string
    updatedAt?: Date
    codeRecover?: number
  }
}
