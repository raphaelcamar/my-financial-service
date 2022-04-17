import { Builder } from "@core/data/protocols"
import { User } from "@user/domain/entities"
import faker from "@faker-js/faker/locale/pt_BR"

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
}
