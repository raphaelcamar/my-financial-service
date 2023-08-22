import mongoose, { Schema } from "mongoose"

const NotificationSchema = new Schema(
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
    readedAt: { type: Date, default: null },
    payload: { type: Object, default: {} },
  },
  {
    timestamps: true,
  }
)

export const Notification = mongoose.model("Notification", NotificationSchema, "Notification")
