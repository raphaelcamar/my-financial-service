import { UserRepositoryData, CryptoRepositoryData } from "@user/infra"
import { Request, Response } from "express"
import { CreateUser, VerifyAccessCredentials, Update } from "@user/data/use-cases"
import { CreateJWToken } from "@user/data/use-cases/create-jwt-token"
import { HttpExceptionFilter } from "@user/presenters"

export class UserController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const userRepositoryData = new UserRepositoryData()
      const cryptoRepositoryData = new CryptoRepositoryData()
      const useCase = new CreateUser(req.body, userRepositoryData, cryptoRepositoryData)
      await useCase.execute()
      res.status(201).json({ message: "User created" })
    } catch (err) {
      console.error(err.stack)
      res.status(err.status).json({ message: err.message })
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body

    try {
      const userRepositoryData = new UserRepositoryData()
      const cryptoRepositoryData = new CryptoRepositoryData()
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

      res.status(200).json({ user: result })
    } catch (err) {
      console.log(err)
      res.status(err.status).json({ message: err.message })
    }
  }

  // TODO: Need to create a update function
  async update(req: Request, res: Response) {
    try {
      const userRepositoryData = new UserRepositoryData()
      const cryptoRepositoryData = new CryptoRepositoryData()
      const useCase = new Update(userRepositoryData, cryptoRepositoryData)
      useCase.execute()
      res.status(201).json({ verified: true })
    } catch (err) {
      res.status(500).json({ err })
    }
  }
}
