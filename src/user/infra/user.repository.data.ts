import { UserRepository } from "@user/data/protocols"
import { User } from "@user/domain/entities/"
import { User as UserSchema } from "./db/schemas"

export class UserRepositoryData implements UserRepository {
  async createUser(user: User): Promise<User> {
    const userSchema = new UserSchema(user)
    const result = await userSchema.save()
    return result
  }

  async findById(id: number) {
    const result = await UserSchema.findById(id).lean()
    return result
  }

  async verifyUserEmail(email: string): Promise<User> {
    const result = await UserSchema.findOne({
      email,
    })

    return result
  }

  async verifyAccessCredentials(email: string, password: string): Promise<User> {
    const result = await UserSchema.findOne({
      password,
      email,
    }).lean()

    return result
  }

  async updateJWToken(user: User, token: string): Promise<User> {
    const result = await UserSchema.findByIdAndUpdate(
      { _id: user._id },
      { token },
      { new: true }
    ).lean()
    return result
  }

  async update() {
    const result = await UserSchema.find({}).lean()

    return result
  }
}
