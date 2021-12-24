export type User = {
  _id?: Number,
  name: string,
  lastname: string
  email: string
  password: string,
  token: {
    token: string;
    expires_in: Date;
  }
  createdAt?: Date,
  Updatedt?: Date
}
