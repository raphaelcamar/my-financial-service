/* eslint-disable no-unused-vars */
import { Tag } from "@tag/domain/entities"
import { TagBuilder } from "@tag/tests/builders"
import { TagProtocol } from "@user/data/protocols"

export class TagRepositorySpy implements TagProtocol {
  async create(tag: Tag): Promise<Tag> {
    const tagCreated = await Promise.resolve(() => {}).then(() => tag)

    return tagCreated
  }
}
