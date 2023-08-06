import { SuccessStatus } from "@core/generic/domain/entities"
import { HttpExceptionHandler } from "@core/generic/utils"
import { CreateTag, ActiveOrInactiveTag, DeleteTag } from "@tag/data/use-cases"
import { TagRepositoryData } from "@tag/infra/repositories"
import { Request, Response } from "@main/handlers"
import { GetTags } from "@tag/data/use-cases/get-tags"
import { TagStatus } from "@tag/domain/entities"
import { GetAllTags } from "@tag/data/use-cases/get-all-tags"

export class TagController {
  // TODO criar validação para os campos
  // TODO passar para o layer de user
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

  // TODO criar validação para verificar se possui tag vinculada à alguma recorrência
  async activeOrInactiveTag(req: Request, res: Response): Promise<void> {
    try {
      const userId = req?.userId
      const tagId = req.params?.id
      const type = req.params?.type as TagStatus

      const tagRepositoryData = new TagRepositoryData()
      const useCase = new ActiveOrInactiveTag(tagRepositoryData, userId, tagId, type)

      const tag = await useCase.execute()

      res.json(tag).status(SuccessStatus.SUCCESS)
    } catch (error) {
      const httpException = new HttpExceptionHandler(error)

      httpException.execute()

      res.status(httpException.status).json({ message: httpException.message })
    }
  }

  // TODO criar validação para verificar se possui tag vinculada à alguma recorrência
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

  // TODO Talvez não seja tão necessário
  async getByStatus(req: Request, res: Response): Promise<void> {
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

  // TODO paginar
  // TODO trazer os itens vinculados à tag dentro do payload
  async get(req: Request, res: Response): Promise<void> {
    try {
      const userId = req?.userId
      const tagRepositoryData = new TagRepositoryData()
      const useCase = new GetAllTags(tagRepositoryData, userId)

      const result = await useCase.execute()

      res.json(result).status(SuccessStatus.SUCCESS)
    } catch (error) {
      const httpException = new HttpExceptionHandler(error)

      httpException.execute()

      res.status(httpException.status).json({ message: httpException.message })
    }
  }
}
