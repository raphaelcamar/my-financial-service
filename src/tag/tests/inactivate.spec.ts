import { MissingParamError } from "@core/generic/domain/errors"
import { ActiveOrInactiveTag } from "@tag/data/use-cases"
import { makeSut } from "./base-sut"

describe("Inactivate Tag", () => {
  test("Should be able to inactivate the Tag, and returns an object with param", async () => {
    const { data, tagRepository } = makeSut()

    const useCase = new ActiveOrInactiveTag(tagRepository, data?.userId, data?.userId, "inactive")

    const result = await useCase.execute()

    expect(result.inactivatedAt).toBeTruthy()
  })

  test("Should be able to activate the Tag, and returns null at inactivatedAt", async () => {
    const { data, tagRepository } = makeSut()

    const useCase = new ActiveOrInactiveTag(tagRepository, data?.userId, data?.userId, "active")

    const result = await useCase.execute()

    expect(result.inactivatedAt).toBeNull()
  })

  test("Should not be able to activate the Tag, and throw MissingParamError", async () => {
    const { data, tagRepository } = makeSut()

    const useCase = new ActiveOrInactiveTag(tagRepository, data?.userId, data?.userId, null)

    await expect(useCase.execute()).rejects.toThrow(MissingParamError)
  })

  test("Should not be able to activate the Tag, and throw MissingParamError", async () => {
    const { data, tagRepository } = makeSut()

    const useCase = new ActiveOrInactiveTag(tagRepository, data?.userId, null, "active")

    await expect(useCase.execute()).rejects.toThrow(MissingParamError)
  })
})
