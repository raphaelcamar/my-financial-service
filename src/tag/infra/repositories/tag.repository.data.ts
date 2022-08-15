import { UnexpectedError } from "@core/generic/domain/errors"
import { TagRepository } from "src/tag/data/protocols"
import { Tag } from "@tag/domain/entities"
import { Tag as TagSchema } from "@tag/infra/db"

export class TagRepositoryData implements TagRepository {
  async create(tag: Tag): Promise<Tag> {
    const tagSchema = new TagSchema(tag)

    const result = await tagSchema.save().catch(err => {
      throw new UnexpectedError()
    })

    return result
  }

  async inactivate(tagId: string, inactivatedAt: Date): Promise<Tag> {
    const result = await TagSchema.findOneAndUpdate({ _id: tagId }, { inactivatedAt }).catch(() => {
      throw new UnexpectedError()
    })

    return result
  }

  async delete(tagId: string, userId: string): Promise<Tag> {
    const result: Tag = await TagSchema.findOneAndDelete({ _id: tagId, userId })

    return result
  }

  async get(userId: string, query: object): Promise<Tag[]> {
    const result = await TagSchema.find({ userId, ...query })
    return result
  }
}
