import { Recurrence } from "src/recurrence/domain"

export interface RecurrenceRepository {
  create(recurrence: Recurrence): Promise<Recurrence.Data>
}
