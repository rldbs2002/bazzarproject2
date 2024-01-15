import Users from "@/models/Users";
import connect from "@/utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request: { json: () => Promise<any> }) => {
  const requestData = await request.json();
  await connect();
  console.log(requestData);
  try {
    const {
      email,
      password,
      requestData: { address_info },
    } = requestData;

    const hashedPassword = await bcrypt.hash(password, 5);

    const newUser = new Users({
      email,
      password: hashedPassword,
      address_info: address_info,
    });

    await newUser.save();
    return new NextResponse("User has been created", {
      status: 200,
    });
  } catch (error) {
    console.error("Error in server code:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
