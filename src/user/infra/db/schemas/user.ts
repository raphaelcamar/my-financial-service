import mongoose, { Schema, ObjectId } from "mongoose"

const UserSchema = new Schema(
  {
    name: { type: String, required: true, default: null },
    lastname: { type: String, required: true, default: null },
    email: { type: String, required: true, default: null },
    password: { type: String, required: true, default: null },
    pictureUrl: { type: String },
    token: {
      tokenId: { type: String, required: false },
      expires_in: { type: Date, required: false },
    },
    codeRecover: { type: Number },
    wallets: [{ type: Schema.Types.ObjectId, ref: "Wallet", required: true }],
  },
  {
    timestamps: true,
  }
)

export const User = mongoose.model("User", UserSchema, "User")
