import { CreateUser } from "@user/data"
import { CryptoRepositoryData } from "@user/infra"
import { User } from "@user/domain/entities"
import { UserRepositorySpy } from "@user/tests/mocks/user-repository-spy"
import { UserBuilder } from "@user/builders"
import { CreateJWToken } from "@user/data/use-cases/create-jwt-token"

// TODO Refactor tests
type Sut = {
  user: User
  userRepositorySpy: UserRepositorySpy
  cryptoRepositoryData: CryptoRepositoryData
}

const makeSutUser = (): Sut => {
  const user: User = new UserBuilder().data
  const userRepositorySpy = new UserRepositorySpy()
  const cryptoRepositoryData = new CryptoRepositoryData()

  return {
    user,
    userRepositorySpy,
    cryptoRepositoryData,
  }
}

describe("Create JWT", () => {
  it("should be able to create a JWT token according to the user data", async () => {
    const { user, cryptoRepositoryData } = makeSutUser()
    const useCase = new CreateJWToken(user, cryptoRepositoryData)
    const result = useCase.execute()
    expect(result).toBeTruthy()
  })
})
