import mongoose, { Schema } from "mongoose"

const MonthlyClosingSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      default: null,
    },
    walletId: {
      type: Schema.Types.ObjectId,
      ref: "Wallet",
      required: true,
    },
    totalSpents: { type: Number, required: true, default: 0 },
    initialBalance: { type: Number, required: true, default: 0 },
    finalBalance: { type: Number, required: true, default: 0 },
    aditionalInformation: { type: String, required: false, default: null },
    month: { type: Number, required: true, default: null },
    year: { type: Number, required: true, default: null },
    transactions: { type: Schema.Types.Array, ref: "Transaction", required: true },
  },
  { timestamps: true }
)

export const MonthlyClosing = mongoose.model("MonthlyClosing", MonthlyClosingSchema, "MonthlyClosing")
