import { UnexpectedError } from "@core/generic/domain/errors"
import { TagProtocol } from "@user/data/protocols"
import { Tag } from "@user/domain/entities"
import { Tag as TagSchema } from "@user/infra/db/schemas"

export class TagRepositoryData implements TagProtocol {
  async create(tag: Tag): Promise<Tag> {
    const tagSchema = new TagSchema({ ...tag })

    const createdTag: any = await tagSchema.save({ safe: true, checkKeys: true }).catch(() => {
      throw new UnexpectedError()
    })

    return new Tag(createdTag)
  }
}
