import UserRequest from "@/models/UserRequest";
import { NextResponse } from "next/server";
import connect from "@/utils/db";

export const GET = async (request: any) => {
  try {
    await connect();

    // User가 소유한 UserRequest를 찾음
    const userRequests = await UserRequest.find({ options: "Repacking" });

    return new NextResponse(JSON.stringify(userRequests), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const POST = async (request: any, { params }: any) => {
  const { id } = params;

  const requestData = await request.json();

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

    userRequest.options = requestData.options;

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
