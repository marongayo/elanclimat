// api/products/route.ts

import { NextRequest, NextResponse } from "next/server";
import {
  getProducts,
  saveProduct,
  deleteProduct,
  getProductById,
} from "@/lib/db";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
  api_key: process.env.CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string,
});

function getPublicId(url: string): string | null {
  try {
    const match = url.match(/\/upload\/(?:v\d+\/)?(.+)\.[a-z]+$/i);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}

export async function GET() {
  const products = await getProducts();
  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const product = { ...body };
  await saveProduct(product);
  const products = await getProducts();
  return NextResponse.json(products, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();

  const product = await getProductById(id);
  if (product?.images?.length) {
    await Promise.allSettled(
      product.images
        .filter((url: string) => url.includes("res.cloudinary.com"))
        .map((url: string) => {
          const publicId = getPublicId(url);
          return publicId
            ? cloudinary.uploader.destroy(publicId)
            : Promise.resolve();
        }),
    );
  }

  await deleteProduct(id);
  return NextResponse.json({ ok: true });
}
