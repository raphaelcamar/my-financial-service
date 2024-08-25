import { TagProtocol } from "@user/data/protocols"

export class GetAllTags {
  constructor(private tagRepository: TagProtocol, private userId: string) {}

  async execute() {
    const data = await this.tagRepository.getAll(this.userId)

    return data
  }
}
