import { Express } from 'express';
import { UserController } from '@user/presenters/user.controller';

const userController = new UserController();

const routes = (app: Express) => {
  app.post('/user/login', userController.login);
  app.post('/user/create', userController.create);
};

export default routes;
