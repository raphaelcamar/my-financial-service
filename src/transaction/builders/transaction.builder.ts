import { Transaction } from "@transaction/domain/entities"
import faker from "@faker-js/faker/locale/pt_BR"
import { Builder } from "@core/generic/data/protocols"

export type TransactionUnion = keyof Transaction

export class TransactionBuilder implements Builder<Transaction> {
  public data: Transaction

  constructor() {
    this.data = this.build()
  }

  build(): Transaction {
    const data = new Transaction({
      billedAt: new Date(),
      topic: faker.random.arrayElement(["FOOD", "TRANSPORT", "HEALTH", "OTHER"]),
      type: faker.random.arrayElement(["ENTRANCE", "SPENT"]),
      userId: faker.datatype.uuid(),
      value: faker.datatype.number({ max: 10, min: 1 }),
      _id: faker.datatype.uuid(),
      amount: faker.datatype.number({ max: 10, min: 1 }),
      anotation: faker.random.words(5),
      walletId: faker.datatype.uuid(),
    })

    return data
  }

  withoutField(fields: TransactionUnion[]): TransactionBuilder {
    fields.map(field => {
      delete this.data[field]
    })

    return this
  }

  array(size: number): Transaction[] {
    const transactions = new Array(size).fill(this.build())
    return transactions
  }
}
