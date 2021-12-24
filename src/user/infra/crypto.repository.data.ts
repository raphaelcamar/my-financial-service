import { CryptoRepository } from '@user/data';
import { User } from '@user/domain';
import Jwt from 'jsonwebtoken';
import CryptoJS from 'crypto-js';

const SECRET_KEY = 'SHA256:B6XlIhfqGIAcTKLVgydOIkLCUnTQxKHDuASWA65UTFU rapha@DESKTOP-8PNJN6R';

export class CryptoRepositoryData implements CryptoRepository {
  async encryptJwt(user: User) {
    const payload = {
      id: user?._id,
      name: user?.name,
      lastname: user?.lastname,
      email: user?.email,
      password: user?.password,
    };

    const token = await Jwt.sign(payload, SECRET_KEY, {
      expiresIn: 86400,
    });

    return token;
  }

  encryptPassword(password: string) {
    const hash = CryptoJS.HmacSHA256(password, SECRET_KEY);
    const hashBASE64 = CryptoJS.enc.Base64.stringify(hash);
    return hashBASE64;
  }
}
