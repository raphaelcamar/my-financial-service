import cron from "node-cron"

// eslint-disable-next-line no-shadow
enum SCHEDULE_TIMERS {
  EVERY_SECOND = "* * * * * *",
  EVERY_DAY_AT_MIDNIGHT = "0 0 * * *",
}

export class CronRepository {
  schedule(functionToSchedule: () => void, timer: keyof typeof SCHEDULE_TIMERS) {
    cron.schedule(SCHEDULE_TIMERS[timer], functionToSchedule, {
      scheduled: true,
      timezone: "America/Sao_Paulo",
    })
  }

  getTasks() {
    return cron.getTasks()
  }
}
