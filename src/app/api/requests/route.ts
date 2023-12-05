import { NextResponse } from "next/server";
import connect from "@/utils/db";
import User from "@/models/User";
import UserRequest from "@/models/UserRequest";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";

export const GET = async (request: any) => {
  try {
    await connect();
    // 사용자의 이메일 주소 (예: 사용자의 실제 이메일 주소로 변경해야 함)
    const userEmail = "admin@admin.com";

    // User를 이메일 주소로 찾음
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    // User가 소유한 UserRequest를 찾음
    const userRequests = await UserRequest.find({ user: user._id, status: 1 });

    return new NextResponse(JSON.stringify(userRequests), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
