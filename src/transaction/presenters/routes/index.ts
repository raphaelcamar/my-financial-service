import { Express } from 'express';
import { VerifyAccessTokenMiddleware } from '@core/presenters/middlewares';
import { TransactionController } from '@transaction/presenters';
import { TransactionValidation } from '../middlewares';

const middlewareToken = new VerifyAccessTokenMiddleware();
const transactionController = new TransactionController();
const transactionValidation = new TransactionValidation();

const routes = (app: Express) => {
  app.post('transaction', middlewareToken.verify, transactionValidation.validate, transactionController.create);
};

export default routes;
