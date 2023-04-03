import { UserBuilder } from "@user/builders"
import { CreatePasswordRecover, CreateUser } from "@user/data/use-cases/user"
import { NotFoundUserError } from "@user/domain/errors"
import { makeSutUser } from "@user/tests/suts"

describe("Create password recover", () => {
  test("Should be able to create a code for password recover", async () => {
    const { userRepositorySpy, cryptoRepositoryData } = makeSutUser()

    const user = new UserBuilder().build()
    const createUser = new CreateUser(user, userRepositorySpy, cryptoRepositoryData)
    const createdUser = await createUser.execute()

    const passwordRecover = new CreatePasswordRecover(userRepositorySpy, createdUser?.email)

    const code = await passwordRecover.execute()

    expect(code).toBeGreaterThan(111111)
    expect(code).toBeLessThan(999999)
  })

  test("Should not be able to create a code for password recover and throw NotFoundUserError", async () => {
    const { userRepositorySpy } = makeSutUser()

    const useCase = new CreatePasswordRecover(userRepositorySpy, "Some-email")

    expect(true).toBeTruthy()
    await expect(useCase.execute()).rejects.toThrow(NotFoundUserError)
  })
})
