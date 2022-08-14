/* eslint-disable no-unused-vars */
import { TagRepository } from "@tag/data/protocols"
import { Tag } from "@tag/domain/entities"

export class TagRepositorySpy implements TagRepository {
  async create(tag: Tag): Promise<Tag> {
    const tagCreated = await Promise.resolve(() => {}).then(() => tag)

    return tagCreated
  }
}
