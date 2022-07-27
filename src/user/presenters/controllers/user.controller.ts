import { History } from "@history/domain/entities"
import { UserRepositoryData, CryptoRepositoryData } from "@user/infra/repositories"
import { Request, Response } from "@main/handlers"
import {
  CreateUser,
  VerifyAccessCredentials,
  CreateJWToken,
  VerifyAccessToken,
  CreatePasswordRecover,
  VerifyPasswordCodeRecover,
  UpdateUser,
} from "@user/data/use-cases"
import { User } from "@user/domain/entities"
import { ErrorStatus, SuccessStatus } from "@core/generic/domain/entities"
import { HttpExceptionHandler } from "@core/generic/utils"
import { EmailServiceRepositoryData } from "@core/generic/infra"
import { CreateHistory } from "@history/data/use-cases"
import { HistoryRepositoryData } from "@history/infra/repositories/history.repository.data"

export class UserController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const userRepositoryData = new UserRepositoryData()
      const cryptoRepositoryData = new CryptoRepositoryData()
      const historyRepository = new HistoryRepositoryData()

      const useCase = new CreateUser(req.body, userRepositoryData, cryptoRepositoryData)
      const user = await useCase.execute()

      const createToken = new CreateJWToken(user, cryptoRepositoryData)
      const token = await createToken.execute()
      const result = await userRepositoryData.updateJWToken(user, token)

      delete result.password

      const history = new History<User, "LOGIN">({
        context: "USER",
        occurrenceDate: new Date(),
        summary: "Entrou no sistema",
        userId: user?._id,
        metadata: user,
        generatedBy: "USER",
        action: "LOGIN",
      })

      const photoHistory = new History<User>({
        context: "USER",
        occurrenceDate: new Date(),
        summary: "Entrou no sistema",
        userId: user?._id,
        metadata: user,
        generatedBy: "USER",
        action: "UPDATE",
      })

      await new CreateHistory(historyRepository, history).execute()

      await new CreateHistory(historyRepository, photoHistory).execute()

      res.status(SuccessStatus.SUCCESS).json(result)
    } catch (err) {
      res
        .status(err?.status || ErrorStatus.INTERNAL)
        .json({ message: err?.message || "Algo deu errado" })
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body

    try {
      const userRepositoryData = new UserRepositoryData()
      const cryptoRepositoryData = new CryptoRepositoryData()
      const historyRepository = new HistoryRepositoryData()
      const useCase = new VerifyAccessCredentials(
        email,
        password,
        userRepositoryData,
        cryptoRepositoryData
      )
      const user = await useCase.execute()
      const createToken = new CreateJWToken(user, cryptoRepositoryData)
      const token = await createToken.execute()
      const result = await userRepositoryData.updateJWToken(user, token)

      delete result.password

      const history = new History<User, "LOGIN">({
        context: "USER",
        occurrenceDate: new Date(),
        summary: "Entrou no sistema",
        userId: user?._id,
        metadata: user,
        generatedBy: "USER",
        action: "LOGIN",
      })
      const historyUseCase = new CreateHistory(historyRepository, history)

      await historyUseCase.execute()

      res.status(SuccessStatus.SUCCESS).json(result)
    } catch (error) {
      const httpException = new HttpExceptionHandler(error)

      httpException.execute()

      res.status(httpException.status).json({ message: httpException.message })
    }
  }

  async verifyAccessToken(req: Request, res: Response) {
    try {
      const { token } = req.body || {}

      const userRepositoryData = new UserRepositoryData()
      const cryptoRepositoryData = new CryptoRepositoryData()
      const useCase = new VerifyAccessToken(token, userRepositoryData)

      const user = await useCase.execute()

      const createToken = new CreateJWToken(user, cryptoRepositoryData)
      const tokenCreated = await createToken.execute()
      const result = await userRepositoryData.updateJWToken(user, tokenCreated)

      delete result.password

      res.status(SuccessStatus.SUCCESS).json(result)
    } catch (error) {
      const httpException = new HttpExceptionHandler(error)

      httpException.execute()

      res
        .status(httpException.status)
        .json({ message: httpException.message, status: httpException.status })
    }
  }

  async passwordRecover(req: Request, res: Response) {
    try {
      const { email } = req.body

      const userRepositoryData = new UserRepositoryData()
      const useCase = new CreatePasswordRecover(userRepositoryData, email)

      const code = await useCase.execute()

      const emailService = new EmailServiceRepositoryData({
        subject: "Recuperação de senha",
        text: `O código da recuperação da sua senha é: ${code}`,
        to: email,
      })

      await emailService.send()

      res.status(SuccessStatus.NO_CONTENT).send()
    } catch (error) {
      const httpException = new HttpExceptionHandler(error)

      httpException.execute()

      res.status(httpException.status).json({ message: httpException.message })
    }
  }

  async verifyCodePasswordRecover(req: Request, res: Response) {
    try {
      const { code, email } = req.body

      const userRepositoryData = new UserRepositoryData()
      const useCase = new VerifyPasswordCodeRecover(userRepositoryData, code, email)

      await useCase.execute()

      res.status(SuccessStatus.NO_CONTENT).send()
    } catch (error) {
      const httpException = new HttpExceptionHandler(error)

      httpException.execute()

      res.status(httpException.status).json({ message: httpException.message })
    }
  }

  // TODO change name of the funtion and endpoint, to updatePassword
  async update(req: Request, res: Response) {
    try {
      const userRepositoryData = new UserRepositoryData()
      const cryptoRepositoryData = new CryptoRepositoryData()
      const historyRepository = new HistoryRepositoryData()

      const useCase = new UpdateUser(
        userRepositoryData,
        req.body as User.Data,
        cryptoRepositoryData
      )
      const user = await useCase.execute()

      const history = new History<User, "PASSWORD">({
        context: "USER",
        occurrenceDate: new Date(),
        summary: "Atualizou a senha",
        userId: user?._id,
        metadata: user,
        generatedBy: "USER",
        action: "PASSWORD",
      })
      const historyUseCase = new CreateHistory(historyRepository, history)

      await historyUseCase.execute()

      res.status(SuccessStatus.SUCCESS).json(user)
    } catch (error) {
      const httpException = new HttpExceptionHandler(error)

      httpException.execute()

      res.status(httpException.status).json({ message: httpException.message })
    }
  }
}
