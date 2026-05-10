import { connectDB } from "./mongodb";
import { BlogPostModel } from "./models/BlogPost";
import { ProductModel } from "./models/Product";
import { MessageModel } from "./models/Message";
import type { BlogPost, Product, Message } from "./data";

const ARCHIVE_AFTER_DAYS = 7;

function archiveCutoff() {
  const d = new Date();
  d.setDate(d.getDate() - ARCHIVE_AFTER_DAYS);
  return d.toISOString();
}

// ─── Blog ─────────────────────────────────────────────────────────────────────
export async function getBlogPosts(): Promise<BlogPost[]> {
  await connectDB();
  const posts = await BlogPostModel.find().sort({ date: -1 }).lean();
  return posts.map(toPlain) as BlogPost[];
}

export async function getBlogPost(slug: string): Promise<BlogPost | undefined> {
  await connectDB();
  const post = await BlogPostModel.findOne({ slug }).lean();
  return post ? (toPlain(post) as BlogPost) : undefined;
}

export async function saveBlogPost(post: BlogPost): Promise<void> {
  await connectDB();
  await BlogPostModel.findOneAndUpdate({ id: post.id }, post, {
    upsert: true,
    returnDocument: "after",
  });
}

export async function deleteBlogPost(id: string): Promise<void> {
  await connectDB();
  await BlogPostModel.findOneAndDelete({ id });
}

// ─── Products ─────────────────────────────────────────────────────────────────
export async function getProducts(): Promise<Product[]> {
  await connectDB();
  const products = await ProductModel.find().lean();
  return products.map((p) => {
    const plain = toPlain(p) as Product;
    plain.images = plain.images?.length
      ? plain.images
      : plain.image
        ? [plain.image]
        : [];
    return plain;
  });
}

export async function getProductById(id: string): Promise<Product | null> {
  await connectDB();
  const product = await ProductModel.findOne({ id }).lean();
  if (!product) return null;
  const plain = toPlain(product) as Product;
  plain.images = plain.images?.length
    ? plain.images
    : plain.image
      ? [plain.image]
      : [];
  return plain;
}

export async function saveProduct(product: Product): Promise<void> {
  await connectDB();
  await ProductModel.findOneAndUpdate({ id: product.id }, product, {
    upsert: true,
    returnDocument: "after",
  });
}

export async function deleteProduct(id: string): Promise<void> {
  await connectDB();
  await ProductModel.findOneAndDelete({ id });
}

// ─── Messages ─────────────────────────────────────────────────────────────────

// Active: last 7 days only
export async function getMessages(): Promise<Message[]> {
  await connectDB();
  const messages = await MessageModel.find({ date: { $gte: archiveCutoff() } })
    .sort({ date: -1 })
    .lean();
  return messages.map(toPlain) as Message[];
}

// Archived: older than 7 days, loaded on demand
export async function getArchivedMessages(): Promise<Message[]> {
  await connectDB();
  const messages = await MessageModel.find({ date: { $lt: archiveCutoff() } })
    .sort({ date: -1 })
    .lean();
  return messages.map(toPlain) as Message[];
}

export async function saveMessage(msg: Message): Promise<void> {
  await connectDB();
  await MessageModel.findOneAndUpdate({ id: msg.id }, msg, {
    upsert: true,
    returnDocument: "after",
  });
}

export async function deleteMessage(id: string): Promise<void> {
  await connectDB();
  await MessageModel.findOneAndDelete({ id });
}

// ─── Helper ───────────────────────────────────────────────────────────────────
function toPlain(doc: any) {
  const { _id, __v, ...rest } = doc;
  return rest;
}
