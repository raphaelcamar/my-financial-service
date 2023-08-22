import { UnexpectedError } from "@core/generic/domain/errors"
import { NotificationProtocol } from "@user/data/protocols/notification.protocol"
import { Notification } from "@user/domain/entities"
import { Notification as NotificationSchema } from "@user/infra/db/schemas"

export class NotificationRepositoryData implements NotificationProtocol {
  async create(notification: Notification<object>): Promise<Notification> {
    const createNotification = new NotificationSchema(notification)

    const createdNotification: any = await createNotification.save().catch(err => {
      throw new UnexpectedError(err)
    })

    return new Notification(createdNotification)
  }

  get(userId: string, walletId: string): Promise<Notification<object>[]> {
    const notifications: any = NotificationSchema.find({ userId, walletId })

    const adapteeNotifications = notifications.map(notification => new Notification(notification))

    return adapteeNotifications
  }

  getNonReaded(userId: string, walletId: string): Promise<Notification<object>[]> {
    const notifications: any = NotificationSchema.find({ userId, walletId, $not: { readedAt: null } })

    const adapteeNotifications = notifications.map(notification => new Notification(notification))

    return adapteeNotifications
  }
}
