import mongoose, { Schema } from "mongoose"

const ReminderSchema = new Schema(
  {
    transactionId: {
      type: Schema.Types.ObjectId,
      ref: "Transaction",
      required: true,
      default: null,
    },
    isCancelled: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
)

export const Reminder = mongoose.model("Reminder", ReminderSchema, "Reminder")
