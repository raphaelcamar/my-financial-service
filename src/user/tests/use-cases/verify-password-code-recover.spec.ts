import { CreatePasswordRecover, CreateUser, VerifyPasswordCodeRecover } from "@user/data/use-cases/user"
import { WrongCodeError } from "@user/domain/errors"
import { makeSutUser } from "../base-sut"

describe("Verify password recover", () => {
  test("Should be able to verify the password code recover", async () => {
    const { user, userRepositorySpy, cryptoRepositoryData } = makeSutUser()

    const createUser = new CreateUser(user, userRepositorySpy, cryptoRepositoryData)
    const userCreated = await createUser.execute()

    const passwordRecover = new CreatePasswordRecover(userRepositorySpy, userCreated?.email)
    const code = await passwordRecover.execute()

    const useCase = new VerifyPasswordCodeRecover(userRepositorySpy, code, userCreated?.email)
    const userFounded = await useCase.execute()

    expect(userFounded).toBeTruthy()
  })

  test("Should not be able to verify the code and throw WrongCodeError", async () => {
    const { user, userRepositorySpy, cryptoRepositoryData } = makeSutUser()

    const createUser = new CreateUser(user, userRepositorySpy, cryptoRepositoryData)
    const userCreated = await createUser.execute()

    const passwordRecover = new CreatePasswordRecover(userRepositorySpy, userCreated?.email)
    await passwordRecover.execute()
    const wrongCode = 111111
    const useCase = new VerifyPasswordCodeRecover(userRepositorySpy, wrongCode, userCreated?.email)

    await expect(useCase.execute()).rejects.toThrow(WrongCodeError)
  })
})
