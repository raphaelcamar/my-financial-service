import { UseCase } from "@core/generic/data/protocols"
import { SocketCommunicationType, SocketPayloadType } from "@core/generic/domain/entities"
import { MonthlyRecurrenceProtocol, TransactionProtocol } from "@user/data/protocols"
import { NotificationProtocol } from "@user/data/protocols/notification.protocol"
import { Notification, Transaction } from "@user/domain/entities"
import { SocketSingletonRepository } from "@user/infra/singletons"

export class CreateTransactionForMonthlyClosing implements UseCase<void> {
  constructor(
    private monthlyRecurrenceRepository: MonthlyRecurrenceProtocol,
    private transactionRespository: TransactionProtocol,
    private notificationRepository: NotificationProtocol
  ) {}

  async execute(): Promise<void> {
    const today = new Date().toLocaleDateString()
    const notificationPromises = []
    const createTransactionPromises = []
    const monthlyRecurrences = await this.monthlyRecurrenceRepository.getBy({ dueDate: "2023-08-13T03:00:00.000Z" })

    monthlyRecurrences.forEach(recurrence => {
      const negativeValue = recurrence.value - recurrence.value * 2

      const transaction = new Transaction({
        billedAt: recurrence.dueDate,
        coin: "BRL",
        paymentType: recurrence.paymentType,
        status: "FINISHED",
        topic: "MONTHLY_RECURRENCE",
        type: "SPENT",
        userId: recurrence.userId,
        walletId: recurrence.walletId,
        value: negativeValue,
        anotation: recurrence.description,
      })

      // notificationPromises.push(
      //   this.emitNotification(SocketPayloadType.MONTHLY_RECURRENCE_EMITTED, recurrence, recurrence.walletId, recurrence.userId)
      // )

      // createTransactionPromises.push(this.createTransactionByMonthlyRecurrence(transaction))
    })

    await Promise.all(notificationPromises)
    await Promise.all(createTransactionPromises)
  }

  async createTransactionByMonthlyRecurrence(transaction: Transaction) {
    try {
      await this.transactionRespository.create(transaction)
    } catch (err) {
      const { io } = SocketSingletonRepository.getInstance()
      io.to(transaction.walletId).emit(SocketCommunicationType.NOTIFICATION, { type: SocketPayloadType.MONTHLY_RECURRENCE_ERROR, payload: err })
    }
  }

  async emitNotification(type: SocketPayloadType, payload: any, walletId: string, userId: string) {
    try {
      await this.notificationRepository.create(new Notification({ payload, walletId, userId }))
    } catch (err) {
      console.error(err)
    }
  }
}
