import { Transaction } from '@transaction/domain';
import { Transaction as TransactionSchema } from '@transaction/infra/db/schemas';

export class TransactionRepositoryData {
  async create(transaction: Transaction) {
    const transactionSchema = new TransactionSchema(transaction);
    const result = await transactionSchema.save();
    return result;
  }
}
