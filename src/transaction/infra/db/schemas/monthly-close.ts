import mongoose, { Schema } from "mongoose"

const MonthlyCloseSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      default: null,
    },
    differencePercentage: { type: Number, required: true, default: 0 },
    startMonthlyDate: { type: Date, required: true },
    endMonthlyDate: { type: Date, required: true, default: new Date() },
    transactions: { type: Schema.Types.Array, ref: "Transaction", required: true },
    status: { type: String, required: true, default: null },
  },
  {
    timestamps: true,
  }
)

export const MonthlyClose = mongoose.model("MonthlyClose", MonthlyCloseSchema, "MonthlyClose")
