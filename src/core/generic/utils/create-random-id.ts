import mongoose, { ObjectId } from "mongoose"

export const createRandomId = (): ObjectId => new mongoose.Types.ObjectId()
