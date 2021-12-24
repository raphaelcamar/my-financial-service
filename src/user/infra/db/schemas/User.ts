// eslint-disable-next-line import/no-import-module-exports
import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  name: { type: String, required: true, default: null },
  lastname: { type: String, required: true, default: null },
  email: { type: String, required: true, default: null },
  password: { type: String, required: true, default: null },
  token: {
    tokenId: { type: String, required: false },
    expires_in: { type: Date, required: false },
  },
}, {
  timestamps: true,
});

export const User = mongoose.model('User', UserSchema, 'User');
