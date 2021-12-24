import { CryptoRepository } from '@user/data';
import { User } from '@user/domain';
import Jwt from 'jsonwebtoken';

export class CryptoRepositoryData implements CryptoRepository {
  async encryptJwt(user: User) {
    const payload = {
      id: user?.id,
      name: user?.name,
      lastname: user?.lastname,
      email: user?.email,
      password: user?.password,
    };

    const token = await Jwt.sign(payload, 'SHA256:B6XlIhfqGIAcTKLVgydOIkLCUnTQxKHDuASWA65UTFU rapha@DESKTOP-8PNJN6R', {
      expiresIn: 86400,
    });

    return token;
  }
}
