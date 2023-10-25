import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Cart from "@/models/Cart";

export const GET = async (request: any) => {
  try {
    await connect();
    const posts = await Cart.find();
    return new NextResponse(JSON.stringify(posts), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
