import { NextResponse } from "next/server";
import connect from "@/utils/db";
import UserRequest from "@/models/UserRequest";
import Cart from "@/models/Cart";

export const GET = async (request: any) => {
  try {
    await connect();

    const cartId = new URL(request.url).pathname.replace("/api/checkout/", "");
    // console.log(cartId);
    // 1. 먼저 모든 Cart 데이터를 가져옵니다.
    const cartData = await Cart.find({ _id: cartId });

    // 2. 각 Cart의 _id로 해당 Cart의 items.userRequest 값을 가져오기 위한 배열 생성

    return new NextResponse(JSON.stringify(cartData), {
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

    // Extract and update repacking images
    const { repacking } = requestData;

    if (
      repacking &&
      repacking.repacking_images &&
      repacking.repacking_images.length > 0
    ) {
      // Initialize the repacking images array if it's not already initialized
      if (!cartRequest.repacking.repacking_images) {
        cartRequest.repacking.repacking_images = [];
      }

      // Add the imageFileUrls to the repacking images array
      cartRequest.repacking.repacking_images.push(
        ...repacking.repacking_images
      );

      // Update 'repacking_at' if it's available in the repacking object
      if (repacking.repacking_at) {
        cartRequest.repacking.repacking_at = new Date(repacking.repacking_at);
      }
      cartRequest.status = 6;
    }

    // 데이터에서 shipping 정보 추출
    const { shipping } = requestData;

    if (
      shipping &&
      shipping.shipping_images &&
      shipping.shipping_images.length > 0
    ) {
      // Initialize the repacking images array if it's not already initialized
      if (!cartRequest.shipping.shipping_images) {
        cartRequest.shipping.shipping_images = [];
      }

      // Add the imageFileUrls to the shipping images array
      cartRequest.shipping.shipping_images.push(...shipping.shipping_images);

      // Update 'shipping_at' if it's available in the shipping object
      if (shipping.shipping_at) {
        cartRequest.shipping.shipping_at = new Date(shipping.shipping_at);
      }
      cartRequest.status = 7;
    }

    // shipping 정보 업데이트
    if (shipping) {
      const {
        shippingCarrier,
        shippingNumber,
        shippingCompleted,
        shipping_at,
      } = shipping;

      if (shippingCarrier) {
        cartRequest.shipping.shipping_carrier = shippingCarrier;
      }

      if (shippingNumber) {
        cartRequest.shipping.shipping_number = shippingNumber;
      }

      if (shippingCompleted !== undefined) {
        cartRequest.shipping.shipping_completed = shippingCompleted;
      }

      if (shipping_at) {
        cartRequest.shipping.shipping_at = new Date(shipping_at);
      }
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
