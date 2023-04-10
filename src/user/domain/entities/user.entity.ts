import { Wallet } from "./wallet.entity"

export class User {
  public _id?: string
  public createdAt?: Date
  public email: string
  public lastname: string
  public name: string
  public password: string
  public token: string
  public updatedAt?: Date
  public wallets: Wallet[]
  public currentWallet?: Wallet
  public codeRecover?: number

  constructor(private data: User.Data) {
    this._id = data.id
    this.createdAt = data?.createdAt || null
    this.email = data.email
    this.lastname = data.lastname
    this.name = data.name
    this.password = data.password
    this.token = data?.token?.tokenId
    this.updatedAt = data?.updatedAt || null
    this.codeRecover = data?.codeRecover
    this.currentWallet = data?.currentWallet
  }
}

export namespace User {
  export interface Data {
    id?: string
    createdAt?: Date
    email: string
    lastname: string
    name: string
    password: string
    wallets: Wallet[]
    currentWallet?: Wallet
    token?: {
      tokenId?: string
      expires_in?: Date
    }
    updatedAt?: Date
    codeRecover?: number
  }
}
