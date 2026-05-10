import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  service: String,
  message: String,
  date: { type: String, required: true },
  read: { type: Boolean, default: false },
  archived: { type: Boolean, default: false },
});

export const MessageModel =
  mongoose.models.Message || mongoose.model("Message", MessageSchema);
