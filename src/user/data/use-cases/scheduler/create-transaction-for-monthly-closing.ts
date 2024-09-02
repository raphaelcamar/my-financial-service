/* eslint-disable no-param-reassign */
import { UseCase } from "@core/generic/data/protocols"
import { SocketCommunicationType, SocketPayloadType } from "@core/generic/domain/entities"
import { MonthlyRecurrenceProtocol, TransactionProtocol } from "@user/data/protocols"
import { NotificationProtocol } from "@user/data/protocols/notification.protocol"
import { MonthlyRecurrence, Notification, Transaction } from "@user/domain/entities"
import { SocketSingletonRepository } from "@user/infra/singletons"
import { parse } from "date-fns"
import { ptBR } from "date-fns/locale"

export class CreateTransactionForMonthlyClosing implements UseCase<void> {
  private CURRENT_DATE = parse(new Date().toLocaleDateString(), "dd/MM/yyyy", new Date(), { locale: ptBR })

  constructor(
    private monthlyRecurrenceRepository: MonthlyRecurrenceProtocol,
    private transactionRespository: TransactionProtocol,
    private notificationRepository: NotificationProtocol
  ) {}

  async execute(): Promise<void> {
    const notificationPromises = []
    const inactivateMonthlyRecurrencesPromises = []
    const transactionsPromises = []

    const monthlyRecurrences = await this.monthlyRecurrenceRepository.getBy({
      $expr: {
        $eq: [
          {
            $dayOfMonth: "$dueDate",
          },
          new Date().getDate(),
        ],
      },
      inactivatedAt: null,
      $or: [{ expirationDate: { $gte: this.CURRENT_DATE } }, { expirationDate: null }],
    })

    monthlyRecurrences.forEach(recurrence => {
      if (recurrence.expirationDate && this.isExpirationClose(recurrence)) {
        notificationPromises.push(this.emitEventForUser(recurrence))
      }

      if (recurrence.expirationDate && this.isCurrentMonthExpiration(recurrence)) {
        inactivateMonthlyRecurrencesPromises.push(this.inactivateMonthlyRecurrence(recurrence))
      }

      this.createTransactionByMonthlyRecurrence(
        new Transaction({
          billedAt: new Date(),
          coin: "BRL",
          paymentType: recurrence.paymentType,
          status: "FINISHED",
          topic: "MONTHLY_RECURRENCE",
          type: recurrence.type,
          userId: recurrence.userId,
          value: recurrence.value,
          walletId: recurrence.walletId,
          anotation: recurrence.description,
        })
      )
    })

    // await Promise.all(inactivateMonthlyRecurrencesPromises)
    // await Promise.all(notificationPromises)
    // await Promise.all(transactionsPromises)
  }

  async createTransactionByMonthlyRecurrence(transaction: Transaction) {
    try {
      await this.transactionRespository.create(transaction)
    } catch (err) {
      const { io } = SocketSingletonRepository.getInstance()
      io.to(transaction.walletId).emit(SocketCommunicationType.NOTIFICATION, { type: SocketPayloadType.MONTHLY_RECURRENCE_ERROR, payload: err })
    }
  }

  isExpirationClose(recurrence: MonthlyRecurrence): boolean {
    const isNearbyFromExpiration = recurrence.expirationDate.getMonth() - new Date().getMonth()

    return isNearbyFromExpiration === 2 || isNearbyFromExpiration === 1
  }

  async emitEventForUser(recurrence: MonthlyRecurrence) {
    const { userId, walletId } = recurrence

    delete recurrence.userId
    delete recurrence.walletId

    await this.notificationRepository.create(
      new Notification<MonthlyRecurrence>({ payload: recurrence, walletId, userId, notificationType: "MONTHLY_RECURRENCE_NEARBY_FROM_EXPIRATION" })
    )
  }

  isCurrentMonthExpiration(recurrence: MonthlyRecurrence): boolean {
    if (recurrence.expirationDate !== null) {
      const isNearbyFromExpiration = recurrence.expirationDate.getMonth() - new Date().getMonth()
      return isNearbyFromExpiration === 0
    }

    return false
  }

  async inactivateMonthlyRecurrence(recurrence: MonthlyRecurrence) {
    return this.monthlyRecurrenceRepository.updateBy(recurrence.userId, recurrence.walletId, {
      inactivatedAt: this.CURRENT_DATE,
    })
  }
}
