import { UserRepositoryData, CryptoRepositoryData } from '@user/infra';
import { Request, Response } from 'express';
import { CreateUser, VerifyAccessCredentials, Update } from '@user/data/use-cases';
import { CreateJWToken } from '@user/data/use-cases/create-jwt-token';
import { NotFoundUserError } from '@user/data';
import { HttpExceptionFilter } from '@user/presenters';

export class UserController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const userRepositoryData = new UserRepositoryData();
      const cryptoRepositoryData = new CryptoRepositoryData();
      const useCase = new CreateUser(req.body, userRepositoryData, cryptoRepositoryData);
      await useCase.execute();
      res.status(201).json({ status: 201, message: 'User created' });
    } catch (err) {
      const status = new HttpExceptionFilter(err).getStatusResponse();
      console.error(err.stack);
      res.status(status).json({ message: err.message, status });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    try {
      const userRepositoryData = new UserRepositoryData();
      const cryptoRepositoryData = new CryptoRepositoryData();
      const useCase = new VerifyAccessCredentials(
        email,
        password,
        userRepositoryData,
        cryptoRepositoryData,
      );
      const user = await useCase.execute();
      if (!user) {
        throw new NotFoundUserError();
      }
      const createToken = new CreateJWToken(user, cryptoRepositoryData);

      const token = await createToken.execute();

      const result = await userRepositoryData.updateJWToken(user, token);

      res.status(201).json({ user: result });
    } catch (err) {
      console.error(err);
      const status = new HttpExceptionFilter(err).getStatusResponse();
      res.status(status).json({ message: err.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const userRepositoryData = new UserRepositoryData();
      const cryptoRepositoryData = new CryptoRepositoryData();
      const useCase = new Update(userRepositoryData, cryptoRepositoryData);
      useCase.execute();
      res.status(201).json({ verified: true });
    } catch (err) {
      res.status(500).json({ err });
    }
  }
}
