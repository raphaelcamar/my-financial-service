import { History } from "@history/domain/entities"
import {
  UserRepositoryData,
  CryptoRepositoryData,
  WalletRepositoryData,
} from "@user/infra/repositories"
import { Request, Response } from "@main/handlers"
import {
  CreateUser,
  VerifyAccessCredentials,
  CreateJWToken,
  VerifyAccessToken,
  CreatePasswordRecover,
  VerifyPasswordCodeRecover,
  UpdateUser,
  UpdatePicture,
  CreateWallet,
  UpdateWallet,
} from "@user/data/use-cases"
import { User, Wallet } from "@user/domain/entities"
import { ErrorStatus, SuccessStatus } from "@core/generic/domain/entities"
import { HttpExceptionHandler } from "@core/generic/utils"
import { CloudServiceRepositoryData, EmailServiceRepositoryData } from "@core/generic/infra"
import { CreateHistory } from "@history/data/use-cases"
import { HistoryRepositoryData } from "@history/infra/repositories/history.repository.data"

export class UserController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const userRepositoryData = new UserRepositoryData()
      const cryptoRepositoryData = new CryptoRepositoryData()
      const walletRepository = new WalletRepositoryData()

      const wallet = new Wallet({
        color: "primary",
        name: "Minha Carteira",
      })
      const createWallet = new CreateWallet(wallet, walletRepository)
      const walletCreated = await createWallet.execute()

      const useCase = new CreateUser(
        { ...req.body, wallets: [walletCreated?.id] },
        userRepositoryData,
        cryptoRepositoryData
      )
      const user = await useCase.execute()

      const createToken = new CreateJWToken(user, cryptoRepositoryData)
      const token = await createToken.execute()

      const updateWallet = new UpdateWallet(
        { ...walletCreated, userId: user._id },
        walletRepository
      )

      await updateWallet.execute()

      const result = await userRepositoryData.updateJWToken(user, token)

      delete result.password

      // const history = new History<User, "LOGIN">({
      //   context: "USER",
      //   occurrenceDate: new Date(),
      //   summary: "Entrou no sistema",
      //   userId: user?._id,
      //   metadata: user,
      //   generatedBy: "USER",
      //   action: "LOGIN",
      // })

      // await new CreateHistory(historyRepository, history).execute()

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

      const useCase = new UpdateUser(userRepositoryData, req.body as User, cryptoRepositoryData)
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

  async updatePicture(req: Request, res: Response): Promise<void> {
    try {
      const userRepositoryData = new UserRepositoryData()
      const historyRepository = new HistoryRepositoryData()
      const cloudServiceRepository = new CloudServiceRepositoryData()

      const { userId, file } = req

      const useCase = new UpdatePicture(
        userRepositoryData,
        cloudServiceRepository,
        file?.filename,
        userId
      )

      const pictureUrl = await useCase.execute()
      const history = new History<string, "PICTURE">({
        context: "USER",
        occurrenceDate: new Date(),
        summary: "Atualizou a foto",
        userId,
        metadata: pictureUrl,
        generatedBy: "USER",
        action: "PICTURE",
      })

      const historyUseCase = new CreateHistory(historyRepository, history)

      await historyUseCase.execute()

      res.json({ pictureUrl }).status(SuccessStatus.NO_CONTENT)
    } catch (error) {
      const httpException = new HttpExceptionHandler(error)

      httpException.execute()

      res.status(httpException.status).json({ message: httpException.message })
    }
  }
}
