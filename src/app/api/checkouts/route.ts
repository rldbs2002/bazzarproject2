import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Cart from "@/models/Cart";
export const dynamic = "force-dynamic";

export const GET = async (request: any) => {
  try {
    await connect();

    // 1. 먼저 모든 Cart 데이터를 가져옵니다.
    const checkoutData = await Cart.find({ status: { $gte: 5, $lte: 6 } });

    return new NextResponse(JSON.stringify(checkoutData), {
      status: 200,
    });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
