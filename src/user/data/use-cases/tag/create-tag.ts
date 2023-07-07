import { UseCase, ValidateFields } from "@core/generic/data/protocols"
import { TagProtocol } from "@user/data/protocols"
import { Tag } from "@user/domain/entities"
import { ValidationError } from "@user/domain/errors"
import { TagValidation } from "@user/presenters/validation"

export class CreateTag implements UseCase<Tag> {
  constructor(private tagRepository: TagProtocol, private tag: Tag, private tagValidation: ValidateFields, private userId: string) {}

  async execute(): Promise<Tag> {
    const error = this.tagValidation.validate()

    if (error) {
      throw new ValidationError(error.error, error.stack)
    }

    const result = await this.tagRepository.create(this.tag, this.userId)

    return result
  }
}
