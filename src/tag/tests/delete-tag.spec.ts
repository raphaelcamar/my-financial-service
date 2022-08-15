import { MissingParamError } from "@core/generic/domain/errors"
import { DeleteTag } from "@tag/data/use-cases"
import { makeSut } from "./base-sut"

describe("Delete Tag", () => {
  test("Should be able to Delete a tag, without any problems", async () => {
    const { tagRepository, data } = makeSut()

    const useCase = new DeleteTag(tagRepository, "1234", data.userId)

    const result = await useCase.execute()

    expect(result).toHaveProperty("color")
    expect(result).toHaveProperty("description")
    expect(result).toHaveProperty("title")
  })

  test("Should not be able to Delete a tag, and throw MissingParamError", async () => {
    const { tagRepository, data } = makeSut()

    const useCase = new DeleteTag(tagRepository, null, data.userId)

    await expect(useCase.execute()).rejects.toThrow(MissingParamError)
  })

  test("Should not be able to Delete a tag, and throw MissingParamError", async () => {
    const { tagRepository } = makeSut()

    const useCase = new DeleteTag(tagRepository, "1234", null)

    await expect(useCase.execute()).rejects.toThrow(MissingParamError)
  })
})
