// lib/mongodb.ts
import mongoose from "mongoose";

import { setServers } from "node:dns/promises";
setServers(["1.1.1.1", "8.8.8.8"]);

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) throw new Error("Please define MONGODB_URI in .env.local");

let cached = (global as any).__mongoose;

if (!cached) {
  cached = (global as any).__mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: process.env.MONGODB_DB_NAME ?? "elan",
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000,
      family: 4, // Force IPv4 — avoids IPv6 resolution failures
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
