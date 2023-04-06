import { Builder } from "@core/generic/data/protocols"
import faker from "@faker-js/faker"
import { MonthlyClosing } from "@user/domain/entities"

type MonthlyClosingUnion = keyof MonthlyClosing

export class MonthlyClosingBuilder implements Builder<MonthlyClosing> {
  public data: MonthlyClosing

  constructor() {
    this.data = this.build()
  }

  build(): MonthlyClosing {
    const data = new MonthlyClosing({
      month: faker.random.arrayElement([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
      transactions: [faker.datatype.uuid(), faker.datatype.uuid(), faker.datatype.uuid()],
      userId: faker.datatype.uuid(),
      walletId: faker.datatype.uuid(),
      year: 2022,
      aditionalInformation: faker.random.words(6),
      totalEntrance: Number(faker.finance.amount()),
      totalSpents: Number(faker.finance.amount()),
      balance: Number(faker.finance.amount()),
    })

    return data
  }

  withoutField(fields: MonthlyClosingUnion[]): MonthlyClosingBuilder {
    fields.map(field => {
      delete this.data[field]
    })

    return this
  }

  array(size: number): MonthlyClosingUnion[] {
    const transactions = new Array(size).fill(this.build())
    return transactions
  }
}
