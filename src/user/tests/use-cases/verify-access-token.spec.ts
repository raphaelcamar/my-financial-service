import { CreateJWToken, CreateUser, VerifyAccessToken } from "@user/data/use-cases"
import { NotFoundUserError } from "@user/domain/errors"
import { makeSutUser } from "../base-sut"

describe("Verify access token", () => {
  it("Should be able to search user by token and return user", async () => {
    const { user, userRepositorySpy, cryptoRepositoryData } = makeSutUser()

    delete user.token

    const useCaseCreate = new CreateUser(user, userRepositorySpy, cryptoRepositoryData)

    const userCreated = await useCaseCreate.execute()

    const createToken = new CreateJWToken(userCreated, cryptoRepositoryData)

    const token = await createToken.execute()
    const userWithToken = await userRepositorySpy.updateJWToken(user, token)

    const useCase = new VerifyAccessToken(userWithToken.token, userRepositorySpy)

    const result = await useCase.execute()

    expect(result).toHaveProperty("email", user.email)
    expect(result).toHaveProperty("lastname", user.lastname)
    expect(result).toHaveProperty("name", user.name)
    expect(result).toHaveProperty("password", user.password)
    expect(result).toHaveProperty("_id", user._id)
  })

  it("Should not be able to search user by token and return user", async () => {
    const { user, userRepositorySpy, cryptoRepositoryData } = makeSutUser()

    const randomToken = user.token
    delete user.token

    const useCaseCreate = new CreateUser(user, userRepositorySpy, cryptoRepositoryData)

    const userCreated = await useCaseCreate.execute()

    const createToken = new CreateJWToken(userCreated, cryptoRepositoryData)

    const token = await createToken.execute()

    await userRepositorySpy.updateJWToken(user, token)

    const useCase = new VerifyAccessToken(randomToken, userRepositorySpy)

    await expect(useCase.execute()).rejects.toThrow(NotFoundUserError)
  })
})
