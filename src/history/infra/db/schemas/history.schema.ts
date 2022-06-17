import mongoose, { Schema } from "mongoose"

const HistorySchema = new Schema(
  {
    context: { type: String, required: true, default: null },
    occurrenceDate: { type: Date, required: true, default: null },
    summary: { type: String, required: true, default: null },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, default: null },
    metadata: { type: Object, default: {} },
  },
  {
    timestamps: true,
  }
)

export const History = mongoose.model("History", HistorySchema, "History")
