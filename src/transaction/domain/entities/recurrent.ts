export interface Recurrent {
  _id?: string
  expired?: boolean
  createdAt?: Date
  endOfRecurrence: Date | 'INDETERMINED'
  recurrenceDate: Date
  updatedAt?: Date
  value: number
}
