import { CronRepository, TransactionRepositoryData, MonthlyRecurrenceRepositoryData, NotificationRepositoryData } from "@user/infra/repositories"
import { VerifyIfCanClose, VerifyIfHasPendingTransactions } from "@user/data/use-cases/monthly-closing"
import { CreateTransactionForMonthlyClosing } from "@user/data/use-cases/scheduler"
import { SocketSingletonRepository } from "@user/infra/singletons"
import { SocketCommunicationType, SocketPayloadType } from "@core/generic/domain/entities"

export class SchedulerController {
  init() {
    const scheduler = new CronRepository()
    // scheduler.schedule(this.closeMonth, "EVERY_DAY_AT_MIDNIGHT")
    scheduler.schedule(this.verifyMonthlyRecurrences, "EVERY_MINUTE")
  }

  async closeMonth() {
    const month = new Date().getMonth() + 1
    const nearbyFromLastDay = new VerifyIfCanClose(month)
    const transactionRepository = new TransactionRepositoryData()

    const result = nearbyFromLastDay.execute()

    if (result) {
      if (result === "IS_10_DAYS") {
        // Notification.emit('')
      }
      if (result === "IS_LAST_DAY") {
        const useCase = new VerifyIfHasPendingTransactions(month, transactionRepository)
        const userAndTransations = await useCase.execute()
        userAndTransations.forEach(userAndTransaction => {
          if (userAndTransaction.transactions) {
            // Notification.emit()
          }
        })
      }
    }
  }

  async verifyMonthlyRecurrences() {
    const monthlyRecurrence = new MonthlyRecurrenceRepositoryData()
    const transactionRepository = new TransactionRepositoryData()
    const notificationRepository = new NotificationRepositoryData()

    const useCase = new CreateTransactionForMonthlyClosing(monthlyRecurrence, transactionRepository, notificationRepository)

    await useCase.execute()
  }
}
