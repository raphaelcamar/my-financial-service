import { CreateUser } from "@user/data"
import { CryptoRepositoryData } from "@user/infra"
import { User } from "@user/domain/entities"
import { UserRepositorySpy } from "@user/tests/mocks/user-repository-spy"

const makeSutUser = (): User => {
  const user: User = {
    _id: "1",
    name: "Raphael",
    lastname: "Santantonio",
    email: "raphaelcamar@outlook.com",
    password: "123456",
    token: "token",
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  return user
}

describe("CreateUser", () => {
  it("should create a user", async () => {
    const user = makeSutUser()
    const userRepositorySpy = new UserRepositorySpy()
    const cryptoRepository = new CryptoRepositoryData()
    const useCase = new CreateUser(user, userRepositorySpy, cryptoRepository)

    const result = await useCase.execute()
    expect(result).toBeTruthy()
  })

  it("should not be able to create a user and throw EmailAlreadyExistsError", async () => {
    const sutUser = makeSutUser()
    const user = { ...sutUser, email: "teste@email.com" }
    const userRepositorySpy = new UserRepositorySpy()
    const cryptoRepository = new CryptoRepositoryData()
    const useCase = new CreateUser(user, userRepositorySpy, cryptoRepository)

    expect.assertions(1)
    try {
      await useCase.execute()
    } catch (e) {
      expect(e.message).toMatch("Este e-mail já está cadastrado.")
    }
  })
})
