import { NextResponse, type NextRequest } from "next/server";
import { remove } from "@/app/lib/products-store";

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const numId = Number(id);
  if (isNaN(numId)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }
  const deleted = remove(numId);
  if (!deleted) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
