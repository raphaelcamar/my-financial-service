import { UnexpectedError } from "@core/generic/domain/errors"
import { UserRepository } from "@user/data/protocols"
import { User } from "@user/domain/entities"
import { User as UserSchema } from "@user/infra/db/schemas"

export class UserRepositoryData implements UserRepository {
  async createUser(user: User): Promise<User> {
    const userSchema = new UserSchema(user)
    const result: any = await userSchema.save().catch(err => {
      throw new UnexpectedError(err)
    })

    return result as User
  }

  async verifyUserEmail(email: string): Promise<User> {
    const result: any = await UserSchema.findOne({
      email,
    }).catch(err => {
      throw new UnexpectedError(err)
    })

    return result as User
  }

  async verifyAccessCredentials(email: string, password: string): Promise<User> {
    const result: any = await UserSchema.findOne({
      password,
      email,
    }).catch(err => {
      throw new UnexpectedError(err)
    })

    return result as User
  }

  async updateJWToken(user: User, token: string): Promise<User> {
    const result: any = await UserSchema.findByIdAndUpdate({ _id: user._id }, { token }, { new: true })
      .populate("wallets")
      .populate("currentWallet")
      .catch(err => {
        throw new UnexpectedError(err)
      })

    return result as User
  }

  async update() {
    const result = await UserSchema.find({}).catch(err => {
      throw new UnexpectedError(err)
    })

    return result
  }

  async verifyAccessToken(token: string): Promise<User> {
    const result: any = await UserSchema.findOne({ token }).catch(err => {
      throw new UnexpectedError(err)
    })
    return result as User
  }

  async updateOneBy(to: object, update: object): Promise<User> {
    const result: any = await UserSchema.findOneAndUpdate(to, update, { new: true }).catch(err => {
      throw new UnexpectedError(err)
    })

    return result as User
  }

  async findByCodeAndUpdate(email: string, code: number): Promise<User> {
    const result: any = await UserSchema.findOneAndUpdate({ email, codeRecover: code }, { codeRecover: null }).catch(err => {
      throw new UnexpectedError(err)
    })

    return result as User
  }

  async updatePicture(pictureUrl: string, userId: string): Promise<string> {
    const result: any = await UserSchema.findOneAndUpdate({ _id: userId }, { pictureUrl }).catch(err => {
      throw new UnexpectedError(err)
    })

    return result as string
  }
}
