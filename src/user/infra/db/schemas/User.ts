// eslint-disable-next-line import/no-import-module-exports
import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  name: { type: String, required: true, default: null },
  lastname: { type: String, required: true, default: null },
  email: { type: String, required: true, default: null },
  password: { type: String, required: true, default: null },
  tokenId: { type: String, default: null },
}, {
  timestamps: true,
});

export const User = mongoose.model('User', UserSchema, 'User');
