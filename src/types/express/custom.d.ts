// eslint-disable-next-line no-unused-vars
declare namespace Express {
  export interface Request {
    userId: string
    walletId?: string
    user?: any
  }
}
