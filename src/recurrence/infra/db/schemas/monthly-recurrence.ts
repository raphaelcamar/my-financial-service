import mongoose, { Schema } from "mongoose"

const MonthlyRecurrenceSchema = new Schema(
  {
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    description: { type: String },
    type: { type: String, required: true },
    name: { type: String, required: true },
    value: { type: Number, required: true },
    inactivatedAt: { type: Date },
    recurrenceType: { type: String, required: true },
    tagId: { type: Schema.Types.ObjectId, ref: "Tag", required: true, default: null },
  },
  { timestamps: true }
)

export const Reminder = mongoose.model(
  "MonthlyRecurrence",
  MonthlyRecurrenceSchema,
  "MonthlyRecurrence"
)
