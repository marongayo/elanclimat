import { Schema, model, models } from "mongoose";

const MessageSchema = new Schema({
  id:      { type: String, required: true, unique: true },
  name:    { type: String, required: true },
  email:   { type: String, required: true },
  phone:   { type: String, default: "" },
  service: { type: String, default: "" },
  message: { type: String, default: "" },
  date:    { type: String, required: true },
  read:    { type: Boolean, default: false },
});

export const MessageModel = models.Message ?? model("Message", MessageSchema);