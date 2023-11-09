import { NextResponse } from "next/server";
import connect from "@/utils/db";
import UserRequest from "@/models/UserRequest";
import Cart from "@/models/Cart";

export const GET = async (request: any) => {
  try {
    await connect();

    const cartId = new URL(request.url).pathname.replace("/api/cart/", "");
    console.log(cartId);
    // 1. 먼저 모든 Cart 데이터를 가져옵니다.
    const cartData = await Cart.find({ _id: cartId });

    // 2. 각 Cart의 _id로 해당 Cart의 items.userRequest 값을 가져오기 위한 배열 생성
    const userRequestData = [];

    for (const cart of cartData) {
      const cartId = cart._id; // Cart의 _id를 한 번만 가져옴

      const cartOptions = cart.options;
      const price_calculate = cart.price_calculate;
      const status = cart.status;

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
              status,
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

export const PUT = async (request: any, { params }: any) => {
  const { id } = params;

  const requestData = await request.json();

  try {
    // 사용자 요청을 찾습니다.
    const cartRequest = await Cart.findOne({
      _id: id, // params.id 대신 id를 사용합니다.
    });

    if (!cartRequest) {
      return new NextResponse("User Request not found", {
        status: 404,
      });
    }

    // 요청된 데이터에서 price_calculate 상태를 업데이트합니다.
    if (requestData.price_calculate) {
      // Ensure that the userRequest.status object is initialized
      cartRequest.price_calculate = {
        submitted_at: requestData.price_calculate.submitted_at,
        total_price: requestData.price_calculate.total_price,
        repacking_price: requestData.price_calculate.repacking_price,
        abroad_shipping_fee: requestData.price_calculate.abroad_shipping_fee,
      };

      // Update the status to 3 ("price_calculate")
      cartRequest.status = 3;
    }

    if (requestData.cart_total_price) {
      cartRequest.cart_total_price = requestData.cart_total_price;
      cartRequest.status = 4; // 4는 Checkout 상태를 나타내는 값으로 변경합니다.
    }

    if (requestData.price_confirm) {
      cartRequest.price_confirm = requestData.price_confirm;
    }

    // 사용자 요청을 저장하고 업데이트된 요청을 반환합니다.
    await cartRequest.save();
    return new NextResponse("User Request has been updated", {
      status: 200,
    });
  } catch (err: any) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
};
