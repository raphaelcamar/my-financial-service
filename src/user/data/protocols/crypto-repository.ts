/* eslint-disable no-unused-vars */
import { User } from '@user/domain/entities/';

export type CryptoRepository = {
  encryptJwt: (user: User) => Promise<string>;
  encryptPassword: (password: string) => string;
}
