import UserRequest from "@/models/UserRequest";
import { NextResponse } from "next/server";
import connect from "@/utils/db";
import { getServerSession } from "next-auth";

export const PUT = async (request: any) => {
  const requestData = await request.json();

  try {
    await connect();

    const { requestId, status } = requestData;

    // Find the existing request by requestId
    const existingRequest = await UserRequest.findOne({
      _id: requestId,
    });

    if (existingRequest) {
      // Update the status
      existingRequest.status = status;
      await existingRequest.save();

      return new NextResponse(JSON.stringify(existingRequest), {
        status: 200,
      });
    } else {
      console.error("Request not found for requestId:", requestId);
      return new NextResponse("Request not found", {
        status: 404,
      });
    }
  } catch (err: any) {
    console.error("Error processing request:", err.message);
    return new NextResponse(err.message, {
      status: 500,
    });
  }
};
