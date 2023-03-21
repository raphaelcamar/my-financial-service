import { CreateJWToken } from "@user/data/use-cases/user"
import { makeSutUser } from "../base-sut"

describe("Create JWT", () => {
  it("should be able to create a JWT token according to the user data", async () => {
    const { user, cryptoRepositoryData } = makeSutUser()
    const useCase = new CreateJWToken(user, cryptoRepositoryData)
    const result = await useCase.execute()
    expect(result).toBeTruthy()
  })
})
