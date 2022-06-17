import { UnexpectedError } from "@core/generic/domain/errors"
import { UserRepository } from "@user/data/protocols"
import { User } from "@user/domain/entities"
import { User as UserSchema } from "@user/infra/db/schemas"

export class UserRepositoryData implements UserRepository {
  async createUser(user: User): Promise<User> {
    const userSchema = new UserSchema(user)
    const result = await userSchema.save().catch(() => {
      throw new UnexpectedError()
    })
    return result
  }

  async verifyUserEmail(email: string): Promise<User> {
    const result = await UserSchema.findOne({
      email,
    }).catch(() => {
      throw new UnexpectedError()
    })

    return result
  }

  async verifyAccessCredentials(email: string, password: string): Promise<User> {
    const result = await UserSchema.findOne({
      password,
      email,
    }).catch(() => {
      throw new UnexpectedError()
    })

    return result
  }

  async updateJWToken(user: User, token: string): Promise<User> {
    const result: User = await UserSchema.findByIdAndUpdate(
      { _id: user._id },
      { token },
      { new: true }
    ).catch(() => {
      throw new UnexpectedError()
    })
    return result
  }

  async update() {
    const result = await UserSchema.find({}).catch(() => {
      throw new UnexpectedError()
    })

    return result
  }

  async verifyAccessToken(token: string): Promise<User> {
    const result: User = await UserSchema.findOne({ token }).catch(() => {
      throw new UnexpectedError()
    })
    return result
  }

  async updateOneBy(to: object, update: object): Promise<User> {
    const result = await UserSchema.findOneAndUpdate(to, update, { new: true }).catch(() => {
      throw new UnexpectedError()
    })

    return result
  }
}
