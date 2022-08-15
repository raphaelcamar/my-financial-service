import { UseCase } from "@core/generic/data/protocols"
import { MissingParamError } from "@core/generic/domain/errors"
import { Tag } from "@tag/domain/entities"
import { TagNotFoundError } from "@tag/domain/errors"
import { TagRepository } from "@tag/data/protocols"

export class DeleteTag implements UseCase<Tag> {
  constructor(
    private tagRepository: TagRepository,
    private tagId: string,
    private userId: string
  ) {}

  async execute(): Promise<Tag> {
    if (!this.tagId) throw new MissingParamError("Missing TagId")
    if (!this.userId) throw new MissingParamError("Missing userId")

    const deletedTag = await this.tagRepository.delete(this.tagId, this.userId)

    if (!deletedTag) throw new TagNotFoundError()

    return deletedTag
  }
}
