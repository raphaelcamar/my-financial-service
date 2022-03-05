import mongoose, { Schema } from "mongoose"

const TransactionSchema = new Schema(
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
  },
  {
    timestamps: true,
  }
)

export const Transaction = mongoose.model("Transaction", TransactionSchema, "Transaction")
