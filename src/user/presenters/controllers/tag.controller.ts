import { Request, Response } from "@main/handlers"
import { Tag } from "@user/domain/entities"
import { HttpExceptionHandler } from "@core/generic/utils"
import { ValidationError } from "@user/domain/errors"
import { CreateTag, DeleteTag, GetAllTags, GetTag, UpdateTag } from "@user/data/use-cases/tag"
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

  async get(req: Request, res: Response) {
    const page = Number(req.query?.page || 1)
    const userId = req?.userId

    try {
      const tagRepository = new TagRepositoryData()
      const useCase = new GetTag(tagRepository, page, userId)

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

  async getAll(req: Request, res: Response) {
    const userId = req?.userId

    try {
      const tagRepository = new TagRepositoryData()
      const useCase = new GetAllTags(tagRepository, userId)

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

  async update(req: Request, res: Response) {
    const userId = req?.userId
    const tag = req.body

    try {
      const tagRepository = new TagRepositoryData()
      const entityTag = new Tag({ ...tag, _id: tag.id, userId })
      const tagValidation = new TagValidation(entityTag)

      const useCase = new UpdateTag(tagRepository, entityTag, tagValidation)
      const updatedTag = await useCase.execute()

      res.json(updatedTag).status(SuccessStatus.SUCCESS)
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

  async deleteTag(req: Request, res: Response) {
    const tagId = req?.params.id

    try {
      const tagRepository = new TagRepositoryData()

      const useCase = new DeleteTag(tagRepository, tagId)
      const deleted = await useCase.execute()

      res.json({ deleted }).status(SuccessStatus.NO_CONTENT)
    } catch (error) {
      const httpException = new HttpExceptionHandler(error)
      httpException.execute()

      res.status(httpException.status).json({ message: httpException.message, stack: error?.stackTrace || [] })
    }
  }
}
