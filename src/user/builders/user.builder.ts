import { Builder } from "@core/generic/data/protocols"
import { User } from "@user/domain/entities"
import faker from "@faker-js/faker/locale/pt_BR"

export type UserUnion = keyof User

export class UserBuilder implements Builder<User> {
  public data: User

  constructor() {
    this.data = this.build()
  }

  build(): User {
    const data: User.Data = {
      email: faker.internet.email(),
      lastname: faker.name.lastName(),
      name: faker.name.firstName(),
      password: "123456",
      token: {
        expires_in: new Date(),
        tokenId: faker.datatype.uuid(),
      },
      id: faker.datatype.uuid(),
      wallets: [],
    }

    const user = new User(data)

    return user
  }

  withoutField(fields: UserUnion[]): UserBuilder {
    fields.map(field => {
      delete this.data[field]
    })

    return this
  }

  defaultEmail(): UserBuilder {
    const user = new User({ ...(this.data as User.Data), email: "teste@teste.com" })
    this.data = user
    return this
  }
}
