import mongoose, { Schema } from "mongoose"
import { updateWalletBeforeAddTransaction, updateWalletBeforeDeleteTransaction, updateWalletBeforeUpdateTransaction } from "../watchers"

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
    paymentType: { type: String, required: true },
    status: { type: String, required: true, default: "PENDING" },
    coin: { type: String, required: true, default: "BRL" },
    recurrenceId: {
      type: Schema.Types.ObjectId,
      ref: "Recurrence",
      required: false,
      default: null,
    },
  },
  {
    timestamps: true,
  }
)

// TransactionSchema.pre("save", updateWalletBeforeAddTransaction)
// TransactionSchema.pre("updateOne", updateWalletBeforeUpdateTransaction)
// TransactionSchema.pre("deleteOne", { document: true, query: false }, updateWalletBeforeDeleteTransaction)

export const Transaction = mongoose.model("Transaction", TransactionSchema, "Transaction")
