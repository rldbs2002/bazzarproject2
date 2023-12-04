import connect from "@/utils/db";
import { NextResponse } from "next/server";
import Event from "@/models/Event";

export const GET = async (request: any) => {
  try {
    await connect();

    // User가 소유한 UserRequest를 찾음
    const event = await Event.find({});

    return new NextResponse(JSON.stringify(event), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const POST = async (request: any) => {
  const requestData = await request.json();
  await connect();

  console.log(requestData);
  try {
    const event = new Event({
      title: requestData.title,
      content: requestData.content,
      writer: requestData.writer,
    });

    await event.save();

    return new NextResponse("event has been created", {
      status: 200,
    });
  } catch (error) {
    console.error("Error in server code:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
