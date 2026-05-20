// lib/models/Product.ts

import { Schema, model, models } from "mongoose";

const ProductSchema = new Schema({
  name: { type: String, required: true },
  fullName: { type: String, default: "" },
  price: { type: Number, required: true },
  category: { type: String, default: "HVAC" },
  images: { type: [String], default: [] },
  description: { type: String, default: "" },
  keyFeatures: { type: [String], default: [] },
  specifications: { type: [{ key: String, value: String }], default: [] },
  inStock: { type: Boolean, default: true },
  badge: { type: String, default: "" },
});

export const ProductModel = models.Product ?? model("Product", ProductSchema);
