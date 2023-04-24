export class Wallet {
  public id?: string
  public userId?: string
  public name: string
  public createdAt?: Date
  public updatedAt?: Date
  public color: string
  public value: number

  constructor(data: Wallet.Data) {
    this.id = data.id
    this.userId = data.userId
    this.name = data.name
    this.createdAt = data.createdAt
    this.updatedAt = data.updatedAt
    this.color = data.color
    this.value = data.value
  }
}

export namespace Wallet {
  export type Data = typeof Wallet.prototype
}
