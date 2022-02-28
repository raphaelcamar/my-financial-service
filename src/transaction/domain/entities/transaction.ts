import { Recurrent } from './recurrent';

export type TypeTransaction = 'ENTRANCE'| 'SPENT' | 'CURRENT'

export interface Transaction {
  _id?: string
  userId: string
  billedAt: Date
  createdAt?: Date
  description: string
  recurrent?: Recurrent
  type: TypeTransaction
  updatedAt?: Date
  value: string
  topic: 'FOOD' | 'PUBLIC_TRANSPORTATION' | 'HEALTH' | 'OTHER'
}
