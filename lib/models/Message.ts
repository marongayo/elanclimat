import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    service: String,
    message: String,
    read: { type: Boolean, default: false },
    archived: { type: Boolean, default: false },
  },
  {
    timestamps: true, // auto-manages createdAt + updatedAt
  },
);

export const MessageModel =
  mongoose.models.Message || mongoose.model("Message", MessageSchema);
