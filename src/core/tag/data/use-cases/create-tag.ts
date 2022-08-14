import { UseCase } from "@core/generic/data/protocols"
import { Tag } from "@core/tag/domain/entities"
import { TagRepository } from "@core/tag/data/protocols"

export class CreateTag implements UseCase<Tag> {
  constructor(private tagRepository: TagRepository, private tag: Tag, private userId: string) {}

  async execute(): Promise<Tag> {
    const entityTag = new Tag({ ...this.tag, userId: this.userId })

    const result = await this.tagRepository.create(entityTag)

    return result
  }
}
