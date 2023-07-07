import { CreateTag } from "@user/data/use-cases/tag"
import { Tag } from "@user/domain/entities"
import { ValidationError } from "@user/domain/errors"
import { TagValidation } from "@user/presenters/validation"
import { makeSut } from "@user/tests/suts/tag-sut"

describe("Create Tag", () => {
  test("Should be able to create a tag, and return its content", async () => {
    const { data, tagRepositorySpy } = makeSut()

    const validation = new TagValidation(data)

    const useCase = new CreateTag(tagRepositorySpy, data, validation, data.userId)

    const result = await useCase.execute()

    expect(result).toHaveProperty("color", data.color)
    expect(result).toHaveProperty("description", data.description)
    expect(result).toHaveProperty("title", data.title)
    expect(result).toHaveProperty("userId", data.userId)
  })

  test("Should be able to validate tag, and return error in all fields", async () => {
    const { data, tagRepositorySpy } = makeSut()

    const validation = new TagValidation({} as Tag)

    const { error, stack } = validation.validate()
    const useCase = new CreateTag(tagRepositorySpy, {} as Tag, validation, data.userId)

    await expect(useCase.execute()).rejects.toThrow(new ValidationError(error, stack))
  })
})
