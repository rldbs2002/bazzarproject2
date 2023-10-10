import { NextResponse } from "next/server";
import connect from "@/utils/db";
import UserRequest from "@/models/UserRequest";

export const GET = async (request: any) => {
  try {
    await connect();
    const posts = await UserRequest.find();
    return new NextResponse(JSON.stringify(posts), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const POST = async (request: any) => {
  const requestData = await request.json();
  await connect();

  try {
    // 현재 년도와 날짜를 가져오는 함수 (예: 20230918)
    const getCurrentYearAndDate = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0"); // 월을 두 자리 숫자로 포맷
      const day = String(now.getDate()).padStart(2, "0"); // 일을 두 자리 숫자로 포맷
      return `${year}${month}${day}-`;
    };

    // 가장 큰 request_id 값을 찾습니다.
    const lastUserRequest = await UserRequest.findOne(
      {},
      {},
      { sort: { request_id: -1 } }
    );

    // 새로운 request_id를 생성합니다.
    let newRequestId = "0001"; // 초기값을 "0001"로 설정
    if (lastUserRequest) {
      const lastRequestId = lastUserRequest.request_id;
      const lastNumber = parseInt(lastRequestId.substr(12), 10); // 년월일 부분을 추출한 후 숫자로 변환
      newRequestId = String(lastNumber + 1).padStart(4, "0"); // 다음 숫자로 증가
    }

    // 서버 스키마에 맞게 데이터를 구성합니다.
    const newUser = new UserRequest({
      request_info: {
        product_list: requestData.request_info.product_list,
        arrived_info: {
          firstname: requestData.request_info.arrived_info.firstname,
          lastname: requestData.request_info.arrived_info.lastname,
          country: requestData.request_info.arrived_info.country,
          address: requestData.request_info.arrived_info.address,
          city: requestData.request_info.arrived_info.city,
          state: requestData.request_info.arrived_info.state,
          postal_code: requestData.request_info.arrived_info.postal_code,
          phone: requestData.request_info.arrived_info.phone,
        },
        tracking_info: {
          tracking_number:
            requestData.request_info.tracking_info.tracking_number,
          tracking_carrier:
            requestData.request_info.tracking_info.tracking_carrier,
          order_number: requestData.request_info.tracking_info.order_number,
          store: requestData.request_info.tracking_info.store,
        },
      },
      request_id: `${getCurrentYearAndDate()}${newRequestId}`, // 새로운 request_id 설정
      status: 1, // 1은 "request_submit" 상태를 나타내는 숫자입니다.
      request_submitted_at: new Date().toISOString(), // "request_submit" 상태의 제출 시간 업데이트
      // 다른 상태 필드도 필요에 따라 추가합니다.
    });

    await newUser.save();
    return new NextResponse("User has been created", {
      status: 201,
    });
  } catch (err: any) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
};

export const PUT = async (request: any) => {
  const requestData = await request.json();
  await connect();

  try {
    // 사용자 요청을 찾습니다.
    const userRequest = await UserRequest.findOne({
      request_id: requestData.request_id,
    });

    if (!userRequest) {
      return new NextResponse("User Request not found", {
        status: 404,
      });
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

export const DELETE = async (request: any) => {
  const requestData = await request.json();
  await connect();

  try {
    // 사용자 요청을 찾습니다.
    const userRequest = await UserRequest.findOne({
      request_id: requestData.request_id,
    });

    if (!userRequest) {
      return new NextResponse("User Request not found", {
        status: 404,
      });
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
