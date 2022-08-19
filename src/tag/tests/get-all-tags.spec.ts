import { GetAllTags } from "@tag/data/use-cases/get-all-tags"
import { makeSut } from "./base-sut"

describe("Get tags", () => {
  test("Should be able to get all tags", async () => {
    const { tagRepository, data } = makeSut()

    const useCase = new GetAllTags(tagRepository, "1234")
    const result = await useCase.execute()

    expect(result.length).toEqual(5)
  })
})
