import mongoose, { Schema } from "mongoose"

const MonthlyRecurrenceSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, default: null },
    walletId: { type: Schema.Types.ObjectId, ref: "Wallet", required: true, default: null },
    expirationDate: { type: Date, default: null },
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag", required: true }],
    inactivatedAt: { type: Date, default: null },
    dueDate: { type: Number, required: true },
    value: { type: Number, required: true },
    paymentType: { type: String, required: true },
  },
  { timestamps: true }
)

export const MonthlyRecurrence = mongoose.model("MonthlyRecurrence", MonthlyRecurrenceSchema, "MonthlyRecurrence")
