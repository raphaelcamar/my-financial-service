import { Notification } from "@user/domain/entities"

export type NotificationProtocol = {
  create: (notification: Notification) => Promise<Notification>
  get: (userId: string, walletId: string) => Promise<Notification[]>
  getNonReaded: (userId: string, walletId: string) => Promise<Notification[]>
}
