import mongoose, { Schema } from "mongoose"

const ReminderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      default: null,
    },
    billedAt: { type: Date, required: true, default: new Date() },
    anotation: { type: String, required: true, default: null },
    type: { type: String, required: true },
    value: { type: Number, required: true },
    topic: { type: String, required: true },
    isCancelled: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
)

export const Reminder = mongoose.model("Reminder", ReminderSchema, "Reminder")
