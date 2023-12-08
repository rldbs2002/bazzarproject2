import { NextResponse } from "next/server";
import connect from "@/utils/db";
import User from "@/models/User";
import UserRequest from "@/models/UserRequest";
import { getServerSession } from "next-auth";

export const GET = async (request: any) => {
  try {
    await connect();

    // User가 소유한 UserRequest를 찾음
    const userRequests = await UserRequest.find({ status: { $lte: 1 } });

    return new NextResponse(JSON.stringify(userRequests), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
