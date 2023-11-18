import connect from "@/utils/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request: any) => {
  await connect();

  const requestData = await request.json();
  console.log("Received data from the client:", requestData);

  const { currentPassword, newPassword, confirmNewPassword, email } =
    requestData;

  try {
    // 현재 사용자 정보를 가져옴
    const user = await User.findOne({ email });

    // 현재 패스워드의 유효성을 검사
    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isPasswordValid) {
      return new NextResponse("Current password is incorrect", {
        status: 400,
      });
    }

    // 새로운 패스워드와 확인용 패스워드 일치 여부 확인
    if (newPassword !== confirmNewPassword) {
      return new NextResponse("New passwords do not match", {
        status: 400,
      });
    }

    // 새로운 패스워드 설정
    const hashedNewPassword = await bcrypt.hash(newPassword, 5);
    user.password = hashedNewPassword;

    // 사용자 정보 저장
    await user.save();

    return new NextResponse("Password changed successfully", {
      status: 200,
    });
  } catch (error) {
    console.error("Error changing password:", error);
    return new NextResponse("Internal Server Error", {
      status: 500,
    });
  }
};
