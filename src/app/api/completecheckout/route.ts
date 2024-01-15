import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Cart from "@/models/Cart";
import { NextApiRequest } from "next";
export const dynamic = "force-dynamic";

export const GET = async (request: NextApiRequest) => {
  try {
    await connect();

    // Get today's date
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0); // Set to the beginning of the day

    const checkoutData = await Cart.find({
      status: 7,
      "shipping.shipping_at": {
        $gte: today, // Greater than or equal to today
      },
    });

    return new NextResponse(JSON.stringify(checkoutData), {
      status: 200,
    });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
