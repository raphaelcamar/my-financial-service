import { UseCase } from "@core/generic/data/protocols"
import { TagProtocol } from "@user/data/protocols"

export class DeleteTag implements UseCase<number> {
  constructor(private tagRepository: TagProtocol, private tagId: string) {}

  async execute() {
    const count = await this.tagRepository.deleteTag(this.tagId)
    return count
  }
}
