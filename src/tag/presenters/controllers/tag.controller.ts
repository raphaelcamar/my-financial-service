import { SuccessStatus } from "@core/generic/domain/entities"
import { HttpExceptionHandler } from "@core/generic/utils"
import { CreateTag, ActiveOrInactiveTag, DeleteTag } from "@tag/data/use-cases"
import { TagRepositoryData } from "@tag/infra/repositories"
import { Request, Response } from "@main/handlers"
import { GetTags } from "@tag/data/use-cases/get-tags"
import { TagStatus } from "@tag/domain/entities"

export class TagController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const userId = req?.userId
      const tagRepositoryData = new TagRepositoryData()
      const tag = req.body

      const useCase = new CreateTag(tagRepositoryData, tag, userId)

      const result = await useCase.execute()

      res.json(result).status(SuccessStatus.SUCCESS)
    } catch (error) {
      const httpException = new HttpExceptionHandler(error)

      httpException.execute()

      res.status(httpException.status).json({ message: httpException.message })
    }
  }

  async activeOrInactiveTag(req: Request, res: Response): Promise<void> {
    try {
      const userId = req?.userId
      const tagId = req.params?.id
      const type = req.params?.type as TagStatus

      const tagRepositoryData = new TagRepositoryData()
      const useCase = new ActiveOrInactiveTag(tagRepositoryData, userId, tagId, type)

      await useCase.execute()

      res.json().status(SuccessStatus.NO_CONTENT)
    } catch (error) {
      const httpException = new HttpExceptionHandler(error)

      httpException.execute()

      res.status(httpException.status).json({ message: httpException.message })
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const userId = req?.userId
      const tagId = req.params?.id

      const tagRepositoryData = new TagRepositoryData()

      const useCase = new DeleteTag(tagRepositoryData, tagId, userId)

      const result = await useCase.execute()

      res.json(result).status(SuccessStatus.SUCCESS)
    } catch (error) {
      const httpException = new HttpExceptionHandler(error)

      httpException.execute()

      res.status(httpException.status).json({ message: httpException.message })
    }
  }

  async get(req: Request, res: Response): Promise<void> {
    try {
      const userId = req?.userId
      const type = req.params?.type as TagStatus

      const tagRepositoryData = new TagRepositoryData()
      const useCase = new GetTags(tagRepositoryData, type, userId)

      const result = await useCase.execute()

      res.json(result).status(SuccessStatus.SUCCESS)
    } catch (error) {
      const httpException = new HttpExceptionHandler(error)

      httpException.execute()

      res.status(httpException.status).json({ message: httpException.message })
    }
  }
}
