import { Pagination, UseCase } from "@core/generic/data/protocols"
import { TagProtocol } from "@user/data/protocols"
import { Tag } from "@user/domain/entities"

export class GetTag implements UseCase<Pagination<Tag, "tags">> {
  constructor(private tagRepository: TagProtocol, private page: number, private userId: string) {}

  async execute(): Promise<Pagination<Tag, "tags">> {
    const data = await this.tagRepository.get(this.page, this.userId)

    return data
  }
}
