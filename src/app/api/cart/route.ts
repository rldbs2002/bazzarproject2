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
      const status = cart.status;
      const cart_total_price = cart.cart_total_price;
      const repacking = cart.repacking;
      const shipping = cart.shipping;
      const cart_id = cart.cart_id;

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
              cart_total_price,
              repacking,
              shipping,
              cart_id,
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
    // 현재 년도와 날짜를 가져오는 함수 (예: 20230918)
    const getCurrentYearAndDate = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      return `${year}${month}${day}`;
    };

    const currentDatePart = getCurrentYearAndDate(); // Get current date part (e.g., 20230918)

    const lastCart = await Cart.findOne(
      { cart_id: { $regex: `^C${currentDatePart}-` } },
      {},
      { sort: { cart_id: -1 } }
    );

    let newCartId = "0001";

    if (lastCart) {
      const lastCartId = lastCart.cart_id;
      const lastNumber = parseInt(lastCartId.substr(10), 11); // Extract the number part after the date

      if (lastNumber < 9999) {
        newCartId = String(lastNumber + 1).padStart(4, "0");
      } else {
        // If it reaches 9999, don't reset, keep it as "9999"
        newCartId = "9999";
      }
    }

    const finalCartId = `C${currentDatePart}-${newCartId}`;

    const cartItems = requestData.map((item: any) => {
      return {
        userRequest: item.userRequest,
        add_to_cart: {
          options: item.add_to_cart.options,
          total_price: item.add_to_cart.total_price,
        },
      };
    });

    // Create a new Cart with the generated Cart ID
    const options = requestData[0].add_to_cart.options;

    const cart = new Cart({
      cart_id: finalCartId,
      status: 2,
      items: cartItems,
      options: options,
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
