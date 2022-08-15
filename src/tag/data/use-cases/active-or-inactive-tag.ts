import { TagRepository } from "@tag/data/protocols"
import { UseCase } from "@core/generic/data/protocols"
import { MissingParamError } from "@core/generic/domain/errors"
import { NotFoundUserError } from "@user/domain/errors"
import { Tag, TagStatus } from "@tag/domain/entities"

export class ActiveOrInactiveTag implements UseCase<Tag> {
  constructor(
    private tagRepository: TagRepository,
    private userId: string,
    private tagId: string,
    private type: TagStatus
  ) {}

  async execute(): Promise<Tag> {
    const verbMessage = this.type === "inactive" ? "desativar" : "ativar"

    if (!this.type) throw new MissingParamError("Missing type")

    if (!this.tagId)
      throw new MissingParamError(`Não foi possível ${verbMessage} a Tag, tente novamente depois`)

    if (!this.userId) throw new NotFoundUserError()

    const param = this.type === "inactive" ? new Date() : null

    const result = await this.tagRepository.inactivate(this.tagId, param)

    return result
  }
}
