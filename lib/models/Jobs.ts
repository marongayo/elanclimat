// lib/models/Jobs.ts

import mongoose from "mongoose";

const ApplicantSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  linkedin: { type: String },
  coverLetter: { type: String, required: true },
  cvUrl: { type: String, required: true },
  appliedAt: { type: Date, default: Date.now },
});

const JobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    category: { type: String, required: true },
    type: { type: String, required: true },
    requirements: { type: [String], required: true },
    applicants: { type: [ApplicantSchema], default: [] },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
);

export const JobModel = mongoose.models.Job || mongoose.model("Job", JobSchema);
