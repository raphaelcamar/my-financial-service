import { UserRepositoryData } from '@user/infra';
import { Request, Response } from 'express';
import { FindById, CreateUser } from '@user/data/use-cases';

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
}
