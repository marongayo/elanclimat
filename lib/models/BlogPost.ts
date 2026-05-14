// lib/models/BlogPost.ts
import { Schema, model, models } from "mongoose";

const BlogPostSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String, default: "" },
  content: { type: String, default: "" },
  category: { type: String, default: "HVAC" },
  image: { type: String, default: "" },
  author: { type: String, default: "Élan Editorial" },
  date: { type: String, default: "" },
  readTime: { type: String, default: "1 min" },
});

// Prevent model recompilation on hot reload
export const BlogPostModel =
  models.BlogPost ?? model("BlogPost", BlogPostSchema);
