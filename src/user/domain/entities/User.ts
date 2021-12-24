export type User = {
  id?: Number,
  name: String,
  lastname: String
  email: String
  password: String,
  token: {
    token: string;
    expires_in: Date;
  }
  createdAt?: Date,
  Updatedt?: Date
}
