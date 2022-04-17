import { UserBuilder } from "@user/builders"
import { User } from "@user/domain/entities"
import { CryptoRepositoryData } from "@user/infra/repositories"
import { UserRepositorySpy } from "./mocks"

type sutType = {
  user: User
  userRepositorySpy: UserRepositorySpy
  cryptoRepositoryData: CryptoRepositoryData
}

export const makeSutUser = (): sutType => {
  const user: User = new UserBuilder().data
  const userRepositorySpy = new UserRepositorySpy()
  const cryptoRepositoryData = new CryptoRepositoryData()

  return {
    user,
    userRepositorySpy,
    cryptoRepositoryData,
  }
}
