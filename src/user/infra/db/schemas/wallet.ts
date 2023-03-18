import mongoose, { Schema } from "mongoose"

const WalletSchema = new Schema(
  {
    color: { type: String },
    name: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", default: null },
    value: { type: Number, required: true, default: 0.0 },
  },
  { timestamps: true }
)

export const Wallet = mongoose.model("Wallet", WalletSchema, "Wallet")
