import {
  Express,
  NextFunction,
  Request as ExpressRequest,
  Response as ExpressResponse,
} from "express"

export interface Request extends ExpressRequest {}

export interface Response extends ExpressResponse {}

export interface App extends Express {}

export type Next = NextFunction
