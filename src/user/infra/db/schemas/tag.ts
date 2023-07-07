import mongoose, { Schema } from "mongoose"

const TagSchema = new Schema(
  {
    description: { type: String, required: true },
    color: { type: String, required: true },
    title: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, default: null },
    inactivatedAt: { type: Date, default: null },
  },
  { timestamps: true }
)

export const Tag = mongoose.model("Tag", TagSchema, "Tag")
