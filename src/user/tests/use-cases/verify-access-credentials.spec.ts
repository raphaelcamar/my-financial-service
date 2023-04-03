import { VerifyAccessCredentials, CreateUser } from "@user/data/use-cases/user"
import { CredentialsError } from "@user/domain/errors"
import { makeSutUser } from "../base-sut"

describe("Verify Access Credentials", () => {
  it("Should be able to search user by password and email and return the user", async () => {
    const { user, cryptoRepositoryData, userRepositorySpy } = makeSutUser()
    const createUserUseCase = new CreateUser(user, userRepositorySpy, cryptoRepositoryData)

    const passBeforeEncrypt = user.password

    await createUserUseCase.execute()

    const useCase = new VerifyAccessCredentials(user.email, passBeforeEncrypt, userRepositorySpy, cryptoRepositoryData)

    const result = await useCase.execute()

    expect(result).toHaveProperty("email", user.email)
    expect(result).toHaveProperty("_id", user._id)
    expect(result).toHaveProperty("lastname", user.lastname)
    expect(result).toHaveProperty("name", user.name)
    expect(result).toHaveProperty("password", user.password)
  })

  it("Should not be able to get user by credentials and throw CredentialsError", async () => {
    const { user, cryptoRepositoryData, userRepositorySpy } = makeSutUser()
    const createUserUseCase = new CreateUser(user, userRepositorySpy, cryptoRepositoryData)

    await createUserUseCase.execute()

    const wrongPassword = "someWrongPassword"

    const useCase = new VerifyAccessCredentials(user.email, wrongPassword, userRepositorySpy, cryptoRepositoryData)

    await expect(useCase.execute()).rejects.toThrow(CredentialsError)
  })
})
