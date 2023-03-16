import mongoose, { Schema } from "mongoose"

const WalletSchema = new Schema(
  {
    color: { type: String },
    name: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, default: null },
  },
  { timestamps: true }
)

export const Wallet = mongoose.model("Wallet", WalletSchema, "Wallet")
