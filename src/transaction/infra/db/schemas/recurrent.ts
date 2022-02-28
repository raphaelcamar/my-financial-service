import mongoose, { Schema } from 'mongoose';

const RecurrentSchema = new Schema({
  expired: { type: Boolean },
  endOfRecurrence: { type: Date, default: null },
  recurrenceDate: { type: Date, required: true },
  value: { type: Number, required: true },
}, {
  timestamps: true,
});

export const User = mongoose.model('Recurrent', RecurrentSchema, 'Recurrent');
