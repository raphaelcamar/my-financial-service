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
}
