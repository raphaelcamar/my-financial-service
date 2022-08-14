import { TagRepository } from "@tag/data/protocols"
import { Tag } from "@tag/domain/entities"
import { TagBuilder } from "./builders"
import { TagRepositorySpy } from "./mocks"

type SutType = {
  tagRepository: TagRepository
  data: Tag
}

export const makeSut = (): SutType => {
  const tagRepository = new TagRepositorySpy()
  const data = new TagBuilder().build()

  return {
    tagRepository,
    data,
  }
}
