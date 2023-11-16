import UserRequest from "@/models/UserRequest";
import { NextResponse } from "next/server";
import connect from "@/utils/db";

export const GET = async (request: any) => {
  try {
    await connect();

    // User가 소유한 UserRequest를 찾음
    const userRequests = await UserRequest.find({ options: "shipping" });

    return new NextResponse(JSON.stringify(userRequests), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const PUT = async (request: any) => {
  const requestData = await request.json();

  try {
    await connect();

    const updatedRequests = await Promise.all(
      requestData.map(async (item: any) => {
        // requestId로 기존 데이터를 찾음
        const existingRequest = await UserRequest.findOne({
          _id: item.requestId,
        });

        if (!existingRequest) {
          // 요청한 requestId에 해당하는 데이터가 없으면 새로운 데이터 생성
          const newRequest = new UserRequest({
            options: item.options,
          });

          return await newRequest.save();
        }

        // 이미 존재하는 데이터가 있으면 업데이트
        existingRequest.options = item.options;
        existingRequest.status = item.status;
        return await existingRequest.save();
      })
    );

    return new NextResponse({
      status: 200,
      body: updatedRequests,
    });
  } catch (err: any) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
};
