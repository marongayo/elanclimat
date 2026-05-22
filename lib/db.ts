// lib/db.ts

import { Types } from "mongoose";
import { connectDB } from "./mongodb";
import { BlogPostModel } from "./models/BlogPost";
import { ProductModel } from "./models/Product";
import { MessageModel } from "./models/Message";
import { UserModel } from "./models/User";
import bcrypt from "bcryptjs";
import { BlogPost } from "@/lib/types/blog";
import { Product } from "@/lib/types/product";
import { Message } from "@/lib/types/message";
import { User } from "@/lib/types/admin";

// ─── Helpers ──────────────────────────────────────────────────────────────────

// Fully serializes a raw Mongoose product document into a plain Product object.
// Handles top-level _id and any nested ObjectIds in sub-document arrays.
function serializeProduct(raw: any): Product {
  return {
    ...raw,
    _id: raw._id.toString(),
    images: raw.images?.length ? raw.images : raw.image ? [raw.image] : [],
    specifications: (raw.specifications ?? []).map(
      ({ _id: sid, ...spec }: any) => ({
        ...spec,
        ...(sid !== undefined ? { _id: sid.toString() } : {}),
      }),
    ),
  };
}

// ─── Blog ─────────────────────────────────────────────────────────────────────
export async function getBlogPosts(): Promise<BlogPost[]> {
  await connectDB();
  const posts = await BlogPostModel.find().sort({ date: -1 }).lean();
  return posts.map(({ _id, ...rest }) => ({
    ...rest,
    _id: _id.toString(),
  })) as unknown as BlogPost[];
}

export async function getBlogPost(slug: string): Promise<BlogPost | undefined> {
  await connectDB();
  const post = await BlogPostModel.findOne({ slug }).lean();
  return post
    ? ({ ...post, _id: post._id.toString() } as unknown as BlogPost)
    : undefined;
}

export async function saveBlogPost(post: BlogPost): Promise<void> {
  await connectDB();
  const { _id, ...data } = post;
  if (_id) {
    await BlogPostModel.findByIdAndUpdate(new Types.ObjectId(_id), data, {
      upsert: false,
    });
  } else {
    await BlogPostModel.create(data);
  }
}

export async function deleteBlogPost(id: string): Promise<void> {
  await connectDB();
  await BlogPostModel.findByIdAndDelete(new Types.ObjectId(id));
}

// ─── Products ─────────────────────────────────────────────────────────────────
export async function getProducts(): Promise<Product[]> {
  await connectDB();
  const products = await ProductModel.find().lean();
  return products.map(({ __v, ...raw }: any) => serializeProduct(raw));
}

export async function getProductById(id: string): Promise<Product | null> {
  await connectDB();
  const raw = await ProductModel.findById(new Types.ObjectId(id)).lean();
  if (!raw) return null;
  const { __v, ...rest } = raw as any;
  return serializeProduct(rest);
}

export async function saveProduct(product: Product): Promise<void> {
  await connectDB();
  const { _id, ...data } = product;
  if (_id) {
    await ProductModel.findByIdAndUpdate(new Types.ObjectId(_id), data, {
      upsert: false,
    });
  } else {
    await ProductModel.create(data);
  }
}

export async function deleteProduct(id: string): Promise<void> {
  await connectDB();
  await ProductModel.findByIdAndDelete(new Types.ObjectId(id));
}

// ─── Messages ─────────────────────────────────────────────────────────────────
export async function getMessages(): Promise<Message[]> {
  await connectDB();
  const messages = await MessageModel.find({ archived: { $ne: true } })
    .sort({ _id: -1 })
    .lean();
  return messages.map(({ _id, ...rest }) => ({
    ...rest,
    _id: _id.toString(),
  })) as unknown as Message[];
}

export async function getArchivedMessages(): Promise<Message[]> {
  await connectDB();
  const messages = await MessageModel.find({ archived: true })
    .sort({ _id: -1 })
    .lean();
  return messages.map(({ _id, ...rest }) => ({
    ...rest,
    _id: _id.toString(),
  })) as unknown as Message[];
}

export async function saveMessage(msg: Message): Promise<void> {
  await connectDB();
  const { _id, ...data } = msg;
  if (_id) {
    await MessageModel.findByIdAndUpdate(new Types.ObjectId(_id), data);
  } else {
    await MessageModel.create(data);
  }
}

export async function deleteMessage(id: string): Promise<void> {
  await connectDB();
  await MessageModel.findByIdAndDelete(new Types.ObjectId(id));
}

// ─── User ─────────────────────────────────────────────────────────────────────
export async function createUser(user: {
  name: string;
  email: string;
  password: string;
  role: string;
}): Promise<void> {
  await connectDB();
  const hashedPassword = await bcrypt.hash(user.password, 10);
  await UserModel.create({ ...user, password: hashedPassword });
}

export async function getUserById(_id: string): Promise<User | null> {
  await connectDB();
  const user = await UserModel.findById(new Types.ObjectId(_id)).lean();
  return user
    ? ({ ...user, _id: user._id.toString() } as unknown as User)
    : null;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  await connectDB();
  const user = await UserModel.findOne({ email }).lean();
  return user
    ? ({ ...user, _id: user._id.toString() } as unknown as User)
    : null;
}

export async function deleteUser(_id: string): Promise<void> {
  await connectDB();
  await UserModel.findByIdAndDelete(new Types.ObjectId(_id));
}

export async function getAllUsers(): Promise<User[]> {
  await connectDB();
  const users = await UserModel.find().lean();
  return users.map(({ _id, ...rest }) => ({
    ...rest,
    _id: _id.toString(),
  })) as unknown as User[];
}

export async function updateUserPassword(
  id: string,
  password: string,
): Promise<void> {
  await connectDB();
  const hashedPassword = await bcrypt.hash(password, 10);
  await UserModel.findByIdAndUpdate(new Types.ObjectId(id), {
    password: hashedPassword,
  });
}
