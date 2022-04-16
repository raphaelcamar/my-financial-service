import { CryptoRepository } from "@user/data/protocols"
import { User } from "@user/domain/entities"
import Jwt from "jsonwebtoken"
import CryptoJS from "crypto-js"

export class CryptoRepositoryData implements CryptoRepository {
  private token_jwt = String(process.env.JWT_SECRET_TOKEN)

  async encryptJwt(user: User) {
    const payload = {
      id: user?._id,
      name: user?.name,
      lastname: user?.lastname,
      email: user?.email,
      password: user?.password,
    }

    const token = await Jwt.sign(payload, this.token_jwt, {
      expiresIn: 86400,
    })

    return token
  }

  encryptPassword(password: string) {
    const hash = CryptoJS.HmacSHA256(password, this.token_jwt)
    const hashBASE64 = CryptoJS.enc.Base64.stringify(hash)
    return hashBASE64
  }
}
