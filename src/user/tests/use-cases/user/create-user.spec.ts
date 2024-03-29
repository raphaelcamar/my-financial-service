import { CreateUser } from "@user/data/use-cases/user"
import { User } from "@user/domain/entities"
import { EmailAlreadyExistsError } from "@user/domain/errors"
import { makeSutUser } from "@user/tests/suts"

describe("CreateUser", () => {
  it("should be able to create a user", async () => {
    const { user, cryptoRepositoryData, userRepositorySpy } = makeSutUser()

    const useCase = new CreateUser(user, userRepositorySpy, cryptoRepositoryData)

    const result = await useCase.execute()

    expect(result).toHaveProperty("email", user.email)
    expect(result).toHaveProperty("lastname", user.lastname)
    expect(result).toHaveProperty("name", user.name)
    expect(result).toHaveProperty("password", user.password)
    expect(result).toHaveProperty("token", user.token)
    expect(result).toHaveProperty("_id", user._id)
  })

  it("should not be able to create a user and throw EmailAlreadyExistsError", async () => {
    const { user, cryptoRepositoryData, userRepositorySpy } = makeSutUser()

    const useCaseCreate = new CreateUser(user, userRepositorySpy, cryptoRepositoryData)

    await useCaseCreate.execute()

    const differentUserEmail = new User({
      ...user,
      email: "teste@teste.com",
      token: { expires_in: null, tokenId: null },
    })

    const useCase = new CreateUser(differentUserEmail, userRepositorySpy, cryptoRepositoryData)

    await expect(useCase.execute()).rejects.toThrow(EmailAlreadyExistsError)
  })
})
