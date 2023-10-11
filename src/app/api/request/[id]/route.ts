import { NextResponse } from "next/server";
import connect from "@/utils/db";
import UserRequest from "@/models/UserRequest";

export const GET = async (request: any, { params }: any) => {
  const { id } = params;
  try {
    await connect();
    const post = await UserRequest.findById(id);
    return new NextResponse(JSON.stringify(post), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const PUT = async (request: any, { params }: any) => {
  const { id } = params;
  const requestData = await request.json();
  console.log(requestData);

  try {
    // 사용자 요청을 찾습니다.
    const userRequest = await UserRequest.findOne({
      _id: id, // params.id 대신 id를 사용합니다.
    });

    if (!userRequest) {
      return new NextResponse("User Request not found", {
        status: 404,
      });
    }

    if (requestData.add_to_cart) {
      userRequest.add_to_cart.options = requestData.add_to_cart.options;
      userRequest.add_to_cart.total_price = requestData.add_to_cart.total_price;

      // 상태를 2로 업데이트합니다 ("add_to_cart")
      userRequest.status = 2;
    }

    // 요청된 데이터에서 price_calculate 상태를 업데이트합니다.
    if (requestData.price_calculate) {
      // Ensure that the userRequest.status object is initialized
      userRequest.price_calculate = {
        submitted_at: requestData.price_calculate.submitted_at,
        total_price: requestData.price_calculate.total_price,
        repacking_price: requestData.price_calculate.repacking_price,
        abroad_shipping_fee: requestData.price_calculate.abroad_shipping_fee,
        purchase_agent_price: requestData.price_calculate.purchase_agent_price,
      };

      // Update the status to 3 ("price_calculate")
      userRequest.status = 3;
    }

    // 요청된 데이터에서 user_confirm 상태를 업데이트합니다.
    if (requestData.user_confirm) {
      // Update the user_confirm field with submitted_at and isChecked
      userRequest.user_confirm = {
        submitted_at: requestData.user_confirm.submitted_at,
      };

      // Update the status to 3 ("user_confirm")
      userRequest.status = 3;
    }

    // Extract and update arrived images
    const { arrived } = requestData;

    if (
      arrived &&
      arrived.arrived_images &&
      arrived.arrived_images.length > 0
    ) {
      // Initialize the arrived images array if it's not already initialized
      if (!userRequest.arrived.arrived_images) {
        userRequest.arrived.arrived_images = [];
      }

      // Add the imageFileUrls to the arrived images array
      userRequest.arrived.arrived_images.push(...arrived.arrived_images);

      // Update 'arrived_at' if it's available in the arrived object
      if (arrived.arrived_at) {
        userRequest.arrived.arrived_at = new Date(arrived.arrived_at);
      }
    }

    // Extract and update repacking images
    const { repacking } = requestData;

    if (
      repacking &&
      repacking.repacking_images &&
      repacking.repacking_images.length > 0
    ) {
      // Initialize the repacking images array if it's not already initialized
      if (!userRequest.repacking.repacking_images) {
        userRequest.repacking.repacking_images = [];
      }

      // Add the imageFileUrls to the repacking images array
      userRequest.repacking.repacking_images.push(
        ...repacking.repacking_images
      );

      // Update 'repacking_at' if it's available in the repacking object
      if (repacking.repacking_at) {
        userRequest.repacking.repacking_at = new Date(repacking.repacking_at);
      }
    }

    // Extract and update shipping images
    const { shipping } = requestData;

    if (
      shipping &&
      shipping.shipping_images &&
      shipping.shipping_images.length > 0
    ) {
      // Initialize the shipping images array if it's not already initialized
      if (!userRequest.shipping.shipping_images) {
        userRequest.shipping.shipping_images = [];
      }

      // Add the imageFileUrls to the shipping images array
      userRequest.shipping.shipping_images.push(...shipping.shipping_images);

      // Update 'shipping_at' if it's available in the shipping object
      if (shipping.shipping_at) {
        userRequest.shipping.shipping_at = new Date(shipping.shipping_at);
      }
    }

    // Check if the checkbox for completed is checked and update the corresponding completed status
    if (requestData.arrived && requestData.arrived.arrived_completed) {
      userRequest.arrived.arrived_completed =
        requestData.arrived.arrived_completed;
      // Update the status based on completed status
      if (userRequest.arrived.arrived_completed) {
        userRequest.status = 5;
      }
    }

    if (requestData.repacking && requestData.repacking.repacking_completed) {
      userRequest.repacking.repacking_completed =
        requestData.repacking.repacking_completed;
      // Update the status based on completed status
      if (userRequest.repacking.repacking_completed) {
        userRequest.status = 6;
      }
    }

    if (requestData.shipping && requestData.shipping.shipping_completed) {
      userRequest.shipping.shipping_completed =
        requestData.shipping.shipping_completed;
      // Update the status based on completed status
      if (userRequest.shipping.shipping_completed) {
        userRequest.status = 7;
      }
    }

    // 사용자 요청을 저장하고 업데이트된 요청을 반환합니다.
    await userRequest.save();
    return new NextResponse("User Request has been updated", {
      status: 200,
    });
  } catch (err: any) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
};

export const DELETE = async (request: any, { params }: any) => {
  const { id } = params;
  try {
    await connect();
    await UserRequest.findByIdAndDelete(id);
    return new NextResponse("Post has been deleted", { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
