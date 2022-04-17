import { Builder } from "@core/data/protocols"
import { User } from "@user/domain/entities"
import faker from "@faker-js/faker/locale/pt_BR"

export type UserUnion = keyof User

export class UserBuilder implements Builder<User> {
  public data: User

  constructor() {
    this.data = this.build()
  }

  build(): User {
    const data: User = {
      email: faker.internet.email(),
      lastname: faker.name.lastName(),
      name: faker.name.firstName(),
      password: "123456",
      token: faker.datatype.uuid(),
      _id: faker.datatype.uuid(),
    }

    return data
  }

  withoutField(fields: UserUnion[]): UserBuilder {
    fields.map(field => {
      delete this.data[field]
    })

    return this
  }

  defaultEmail(): UserBuilder {
    const user = { ...this.data, email: "teste@teste.com" }
    this.data = user
    return this
  }
}
