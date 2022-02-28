import { Express } from 'express';
import { VerifyAccessTokenMiddleware } from '@core/presenters/middlewares';

const middlewareToken = new VerifyAccessTokenMiddleware();

const routes = (app: Express) => {
  // app.post('transaction', middlewareToken.verify, () => {});
  // app.get('transaction/:id', middlewareToken.verify, () => {});
  // app.put('transaction/:id', middlewareToken.verify, () => {});
  // app.delete('transaction/:id', middlewareToken.verify, () => {});
};

export default routes;
