import { Express } from 'express';
import { UserController } from '@user/presenters/user.controler';

const userController = new UserController();

const routes = (app: Express) => {
  app.get('/user/:id', userController.findById);
  app.post('/user', userController.create);
};

export default routes;
