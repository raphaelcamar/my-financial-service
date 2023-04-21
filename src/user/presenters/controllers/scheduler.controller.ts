import { CronRepository, TransactionRepositoryData } from "@user/infra/repositories"
import { VerifyIfCanClose, VerifyIfHasPendingTransactions } from "@user/data/use-cases/monthly-closing"

export class SchedulerController {
  init() {
    const scheduler = new CronRepository()
    scheduler.schedule(this.closeMonth, "EVERY_DAY_AT_MIDNIGHT")
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
}
