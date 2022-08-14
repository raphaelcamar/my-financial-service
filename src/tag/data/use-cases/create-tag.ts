import { UseCase } from "@core/generic/data/protocols"
import { Tag } from "@tag/domain/entities"
import { TagRepository } from "@tag/data/protocols"
import { NotFoundUserError } from "@user/domain/errors"

export class CreateTag implements UseCase<Tag> {
  constructor(private tagRepository: TagRepository, private tag: Tag, private userId: string) {}

  async execute(): Promise<Tag> {
    if (!this.userId) throw new NotFoundUserError()

    const entityTag = new Tag({ ...this.tag, userId: this.userId })

    const result = await this.tagRepository.create(entityTag)

    return result
  }
}
