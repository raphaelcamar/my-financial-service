import { MissingParamError } from "@core/generic/domain/errors"
import { GetTags } from "@tag/data/use-cases/get-tags"
import { NotFoundUserError } from "@user/domain/errors"
import { makeSut } from "./base-sut"

describe("Get tags", () => {
  test("Should be able to get tags", async () => {
    const { tagRepository } = makeSut()

    const useCase = new GetTags(tagRepository, "active", "1234")
    const result = await useCase.execute()

    expect(result.length).toEqual(5)
  })

  test("Should be able to get active filter tags", async () => {
    const { tagRepository } = makeSut()

    const expectedQuery = { inactivatedAt: null }

    const useCase = new GetTags(tagRepository, "active", "1234")
    const result = await useCase.getQuery("active")

    expect(result).toEqual(expectedQuery)
  })

  test("Should be able to get inactive filter tags", async () => {
    const { tagRepository } = makeSut()

    const expectedQuery = { inactivatedAt: { $ne: null } }

    const useCase = new GetTags(tagRepository, "active", "1234")
    const result = useCase.getQuery("inactive")

    expect(result).toEqual(expectedQuery)
  })

  test("Should not be able to get tags and throw MissingParamError", async () => {
    const { tagRepository } = makeSut()

    const useCase = new GetTags(tagRepository, null, "1234")

    await expect(useCase.execute()).rejects.toThrow(MissingParamError)
  })

  test("Should not be able to get tags and throw NotFoundUserError", async () => {
    const { tagRepository } = makeSut()

    const useCase = new GetTags(tagRepository, "active", null)

    await expect(useCase.execute()).rejects.toThrow(NotFoundUserError)
  })
})
