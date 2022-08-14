import { UnexpectedError } from "@core/generic/domain/errors"
import { TagRepository } from "@core/tag/data/protocols"
import { Tag } from "@core/tag/domain/entities"
import { Tag as TagSchema } from "@core/tag/infra/db"

export class TagRepositoryData implements TagRepository {
  async create(tag: Tag): Promise<Tag> {
    const tagSchema = new TagSchema(tag)

    const result = await tagSchema.save().catch(err => {
      throw new UnexpectedError()
    })

    return result
  }
}
