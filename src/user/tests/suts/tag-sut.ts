import { TagRepositorySpy } from "@user/tests/mocks"
import { TagBuilder } from "@user/builders"
import { Tag } from "@user/domain/entities"

type SutType = {
  data: Tag
  tagRepositorySpy: TagRepositorySpy
}

export const makeSut = (): SutType => {
  const tagRepositorySpy = new TagRepositorySpy()
  const data = new TagBuilder().build()

  return {
    tagRepositorySpy,
    data,
  }
}
