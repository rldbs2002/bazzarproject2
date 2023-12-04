import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Event from "@/models/Event";

export const GET = async (request: any, { params }: any) => {
  const { id } = params;
  try {
    await connect();
    const post = await Event.findById(id);
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
    const event = await Event.findOne({
      _id: id, // params.id 대신 id를 사용합니다.
    });

    if (!event) {
      return new NextResponse("User Request not found", {
        status: 404,
      });
    }

    // Update the event object with new data
    if (requestData) {
      event.title = requestData.title;
    }

    if (requestData) {
      event.content = requestData.content;
    }

    await event.save();

    console.log(event);
    return new NextResponse("event Edited Completed", {
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
    await Event.findByIdAndDelete(id);
    return new NextResponse("Post has been deleted", { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
