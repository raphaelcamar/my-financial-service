import { MissingParamError } from "@core/generic/domain/errors"
import { CreateTag } from "@tag/data/use-cases"
import { Tag } from "@tag/domain/entities"
import { NotFoundUserError } from "@user/domain/errors"
import { makeSut } from "./base-sut"

describe("Create tag", () => {
  test("Should be able to create a tag normally, and return its content", async () => {
    const { data, tagRepository } = makeSut()

    const useCase = new CreateTag(tagRepository, data, data.userId)

    const result = await useCase.execute()

    expect(result).toHaveProperty("color", data.color)
    expect(result).toHaveProperty("description", data.description)
    expect(result).toHaveProperty("title", data.title)
    expect(result).toHaveProperty("userId", data.userId)
  })

  test("Should be able to create a tag with metadata, and return its content", async () => {
    const { data, tagRepository } = makeSut()

    type Metadata = {
      anotherUserId: string
    }

    const tagWithMetadata = new Tag<Metadata>({
      ...data,
      metadata: {
        anotherUserId: "1234",
      },
    })

    const useCase = new CreateTag(tagRepository, tagWithMetadata, data.userId)

    const result = await useCase.execute()

    expect(result).toHaveProperty("color", tagWithMetadata.color)
    expect(result).toHaveProperty("description", tagWithMetadata.description)
    expect(result).toHaveProperty("title", tagWithMetadata.title)
    expect(result).toHaveProperty("userId", tagWithMetadata.userId)
    expect(result.metadata).toHaveProperty("anotherUserId", tagWithMetadata.metadata?.anotherUserId)
  })

  test("Should not be able to create a tag, and throw MissingParamError", async () => {
    const { data, tagRepository } = makeSut()

    const useCase = new CreateTag(tagRepository, null, data.userId)

    await expect(useCase.execute()).rejects.toThrow(MissingParamError)
  })

  test("Should not be able to create a tag, and throw NotFoundUserError", async () => {
    const { data, tagRepository } = makeSut()

    const useCase = new CreateTag(tagRepository, data, null)

    await expect(useCase.execute()).rejects.toThrow(NotFoundUserError)
  })
})
