import { ErrorStatus, SuccessStatus } from "@core/generic/domain/entities"
import { Request, Response } from "@main/handlers"
import { UpdateUser, UpdateUserWallets } from "@user/data/use-cases/user"
import { CreateWallet, GetWallets } from "@user/data/use-cases/wallet"
import { UserRepositoryData, WalletRepositoryData } from "@user/infra/repositories"

export class WalletController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const { userId, body } = req
      const walletRepository = new WalletRepositoryData()
      const userRepository = new UserRepositoryData()
      const createWallet = new CreateWallet({ ...body, userId }, walletRepository)
      const result = await createWallet.execute()

      const updateUserWithNewWallet = new UpdateUserWallets(userRepository, result)
      await updateUserWithNewWallet.execute()

      res.status(SuccessStatus.SUCCESS).json(result)
    } catch (err) {
      res.status(err?.status || ErrorStatus.INTERNAL).json({ message: err?.message || "Algo deu errado" })
    }
  }

  async get(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req
      const walletRepository = new WalletRepositoryData()
      const createWallet = new GetWallets(userId, walletRepository)

      const result = await createWallet.execute()

      res.status(SuccessStatus.SUCCESS).json(result)
    } catch (err) {
      res.status(err?.status || ErrorStatus.INTERNAL).json({ message: err?.message || "Algo deu errado" })
    }
  }
}
