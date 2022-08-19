import { UseCase } from "@core/generic/data/protocols"
import { Tag } from "@tag/domain/entities"
import { NotFoundUserError } from "@user/domain/errors"
import { TagRepository } from "@tag/data/protocols"

export class GetAllTags implements UseCase<Tag[]> {
  constructor(private tagRepository: TagRepository, private userId: string) {}

  async execute(): Promise<Tag[]> {
    if (!this.userId) throw new NotFoundUserError()

    const result = await this.tagRepository.getAll(this.userId)

    return result
  }
}
