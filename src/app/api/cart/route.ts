import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Cart from "@/models/Cart";
import UserRequest from "@/models/UserRequest";

export const GET = async (request: any) => {
  try {
    await connect();

    // 1. 먼저 모든 Cart 데이터를 가져옵니다.
    const cartData = await Cart.find();

    // 2. 각 Cart의 _id로 해당 Cart의 items.userRequest 값을 가져오기 위한 배열 생성
    const userRequestData = [];

    for (const cart of cartData) {
      const cartId = cart._id; // Cart의 _id를 한 번만 가져옴

      const cartOptions = cart.options;
      const price_calculate = cart.price_calculate;

      for (const item of cart.items) {
        if (item.userRequest) {
          const userRequestId = item.userRequest;
          const userRequest = await UserRequest.findOne({
            _id: userRequestId,
          });

          if (userRequest) {
            // userRequest 및 해당 Cart ID를 묶어서 추가
            userRequestData.push({
              cartId,
              userRequest,
              cartOptions,
              price_calculate,
            });
          }
        }
      }
    }

    // userRequestData를 CartId 별로 그룹화
    const groupedData = userRequestData.reduce((result, entry) => {
      (result[entry.cartId] = result[entry.cartId] || []).push(entry);
      return result;
    }, {});

    return new NextResponse(JSON.stringify(groupedData), {
      status: 200,
    });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const POST = async (request: any) => {
  const requestData = await request.json();

  try {
    const cartItems = requestData.map((item: any) => {
      return {
        userRequest: item.userRequest,
        add_to_cart: {
          options: item.add_to_cart.options, // 클라이언트에서 받아온 options 값 유지
          total_price: item.add_to_cart.total_price,
        },
      };
    });

    // Cart 생성
    const options = requestData[0].add_to_cart.options; // 클라이언트에서 받아온 options 값 유지

    const cart = new Cart({
      user: requestData[0].userRequest.user,
      status: 2,
      items: cartItems,
      options: options, // 클라이언트에서 받아온 options 값을 설정
    });

    await cart.save();
    return new NextResponse("항목이 장바구니에 추가되었습니다", {
      status: 200,
    });
  } catch (error) {
    console.error("새로운 Cart를 생성하는 중 오류 발생:", error);
    return new NextResponse("새로운 Cart를 생성하는 중 오류 발생", {
      status: 500,
    });
  }
};
