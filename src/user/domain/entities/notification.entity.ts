export type NotificationType = "MONTHLY_RECURRENCE_ERROR" | "MONTHLY_RECURRENCE_EMITTED" | "MONTHLY_RECURRENCE_NEARBY_FROM_EXPIRATION"
export class Notification<T = object> {
  public _id: string
  public payload: T
  public readedAt: Date
  public userId: string
  public walletId: string
  public notificationType: NotificationType

  constructor(data: Notification.Data<T>) {
    this._id = data?._id
    this.payload = data.payload
    this.readedAt = data.readedAt ? new Date(data.readedAt) : null
    this.userId = data.userId
    this.walletId = data.walletId
  }
}

export namespace Notification {
  export interface Data<T> {
    _id?: string
    payload: T
    readedAt?: Date
    userId: string
    walletId: string
    notificationType: NotificationType
  }
}
