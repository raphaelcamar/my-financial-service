import { UseCase } from "@core/generic/data/protocols"
import { MissingParamError } from "@core/generic/domain/errors"
import { Tag, TagStatus } from "@tag/domain/entities"
import { NotFoundUserError } from "@user/domain/errors"
import { TagRepository } from "@tag/data/protocols"

export class GetTags implements UseCase<Tag[]> {
  constructor(
    private tagRepository: TagRepository,
    private type: TagStatus,
    private userId: string
  ) {}

  async execute(): Promise<Tag[]> {
    if (!this.userId) throw new NotFoundUserError()

    if (!this.type) throw new MissingParamError("missing type")

    const query = this.getQuery(this.type)

    const result = await this.tagRepository.get(this.userId, query)

    return result
  }

  getQuery(tagStatus: "active" | "inactive"): object {
    const obj = { active: { inactivatedAt: null }, inactive: { inactivatedAt: { $ne: null } } }

    return obj[tagStatus]
  }
}
