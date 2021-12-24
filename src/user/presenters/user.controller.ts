import { UserRepositoryData } from '@user/infra';
import { Request, Response } from 'express';
import { FindById, CreateUser, VerifyAccessCredentials } from '@user/data/use-cases';
import { CreateJWToken } from '@user/data/use-cases/create-jwt-token';
import { NotFoundUserError } from '@user/data';
import { CryptoRepositoryData } from '@user/infra/crypto.repository.data';

export class UserController {
  async findById(req: Request, res: Response) {
    try {
      const userRepositoryData = new UserRepositoryData();
      const useCase = new FindById(req.params.id, userRepositoryData);
      const result = useCase.findById();
      res.status(200).json(result);
    } catch (err: any) {
      res.status(err.status).json(err.message);
    }
  }

  async create(req: Request, res: Response) {
    try {
      const userRepositoryData = new UserRepositoryData();
      const useCase = new CreateUser(req.body, userRepositoryData);
      await useCase.createUser();
      res.json('Created!');
    } catch (err: any) {
      res.status(402).json(err.message);
    }
  }

  // TODO: criar middleware para criptografar os dados sensiveis
  async login(req: Request, res: Response): Promise<any> {
    const { email, password } = req.body;

    try {
      const userRepositoryData = new UserRepositoryData();
      const cryptoRepositoryData = new CryptoRepositoryData();
      const useCase = new VerifyAccessCredentials(email, password, userRepositoryData);
      const user = await useCase.verifyAccessCredentials(); // user logado com suas infos
      if (!user) {
        throw new NotFoundUserError();
      }
      const createToken = new CreateJWToken(user, cryptoRepositoryData);

      const token = await createToken.execute();

      const result = await userRepositoryData.updateJWToken(user, token);

      return res.status(201).json({ auth: true, user: result });
    } catch (err: any) {
      return res.status(500).json(err.message);
    }
  }

  // async update(req: Request, res: Response):Promise<any> {
  //   try {

  //   } catch (err) {

  //   }
  // }
}
