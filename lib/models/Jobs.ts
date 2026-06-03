// lib/models/Jobs.ts
import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    category: { type: String, required: true },
    type: { type: String, required: true },
    requirements: { type: [String], required: true },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
);

export const JobModel = mongoose.models.Job || mongoose.model("Job", JobSchema);
