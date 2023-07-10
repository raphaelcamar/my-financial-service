import { Request, Response } from "@main/handlers"
import { Tag } from "@user/domain/entities"
import { HttpExceptionHandler } from "@core/generic/utils"
import { ValidationError } from "@user/domain/errors"
import { CreateTag } from "@user/data/use-cases/tag"
import { TagRepositoryData } from "@user/infra/repositories"
import { SuccessStatus } from "@core/generic/domain/entities"
import { TagValidation } from "../validation"

export class TagController {
  async create(req: Request, res: Response) {
    const userId = req?.userId
    const tag = req.body

    try {
      const entityTag = new Tag({ ...tag, userId })

      const tagValidation = new TagValidation(entityTag)
      const tagRepository = new TagRepositoryData()

      const useCase = new CreateTag(tagRepository, entityTag, tagValidation)

      const result = await useCase.execute()

      res.json(result).status(SuccessStatus.SUCCESS)
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(error?.status).json(error?.stackTrace)
        return
      }

      const httpException = new HttpExceptionHandler(error)

      httpException.execute()

      res.status(httpException.status).json({ message: httpException.message, stack: error?.stackTrace || [] })
    }
  }

  async get(req: Request, res: Response) {}
}
