import { Express } from 'express';
import { UserController } from '@user/presenters/user.controller';

const userController = new UserController();

const routes = (app: Express) => {
  app.get('/user/:id', userController.findById);
  app.post('/user/login', userController.login);
  app.put('/user/update', userController.update);
  app.post('/user/create', userController.create);
};

export default routes;
