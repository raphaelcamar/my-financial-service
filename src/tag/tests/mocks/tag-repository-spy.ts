/* eslint-disable no-unused-vars */
import { TagRepository } from "@tag/data/protocols"
import { Tag } from "@tag/domain/entities"
import { TagBuilder } from "@tag/tests/builders"

export class TagRepositorySpy implements TagRepository {
  async getAll(userId: string): Promise<Tag[]> {
    const tags = await Promise.resolve(() => {}).then(() => new TagBuilder().array(5))

    return tags
  }

  async create(tag: Tag): Promise<Tag> {
    const tagCreated = await Promise.resolve(() => {}).then(() => tag)

    return tagCreated
  }

  async inactivate(tagId: string, inactivatedAt: Date): Promise<Tag> {
    const tag = new TagBuilder().build()
    const tagUpdated = await Promise.resolve(() => {}).then(() => tag)

    return { ...tagUpdated, inactivatedAt }
  }

  async delete(tagId: string, userId: string): Promise<Tag> {
    const tag = new TagBuilder().build()
    const tagUpdated = await Promise.resolve(() => {}).then(() => tag)

    return tagUpdated
  }

  async get(userId: string, query: object): Promise<Tag[]> {
    const tags = await Promise.resolve(() => {}).then(() => new TagBuilder().array(5))

    return tags
  }
}
