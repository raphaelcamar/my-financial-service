import mongoose, { Schema } from "mongoose"

const TransactionSchema = new Schema(
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
    billedAt: { type: Date, required: true, default: new Date() },
    anotation: { type: String, required: true, default: null },
    type: { type: String, required: true },
    value: { type: Number, required: true },
    topic: { type: String, required: true },
    status: { type: String, required: true },
    coin: { type: String, required: true, default: "BRL" },
  },
  {
    timestamps: true,
  }
)

export const Transaction = mongoose.model("Transaction", TransactionSchema, "Transaction")
