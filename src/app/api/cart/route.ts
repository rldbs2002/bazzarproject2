import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Cart from "@/models/Cart";
import UserRequest from "@/models/UserRequest";

export const GET = async (request: any) => {
  try {
    await connect();

    // 1. 먼저 Cart 콜렉션에서 userRequest 값을 가진 모든 데이터를 찾습니다.
    const cartData = await Cart.find({
      "items.userRequest": { $exists: true },
    });

    // 2. 각 `cartData`의 `items` 배열을 반복하면서 `userRequest` 값을 추출하고, 해당 값을 사용하여 UserRequest 데이터를 찾습니다.
    const userRequestData = [];

    for (const cartItem of cartData) {
      for (const item of cartItem.items) {
        if (item.userRequest) {
          const userRequest = await UserRequest.findOne({
            _id: item.userRequest,
          });
          if (userRequest) {
            userRequestData.push(userRequest);
          }
        }
      }
    }

    return new NextResponse(JSON.stringify({ cartData, userRequestData }), {
      status: 200,
    });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
