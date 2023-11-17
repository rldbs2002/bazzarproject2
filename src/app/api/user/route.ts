import { NextResponse } from "next/server";
import connect from "@/utils/db";
import User from "@/models/User";
import UserRequest from "@/models/UserRequest";
import { getSession } from "next-auth/react";

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

    return new NextResponse(JSON.stringify(user), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const PUT = async (request: any) => {
  const requestData = await request.json();
  await connect();

  try {
    const { arrived_info } = requestData;

    // 세션에서 이메일 가져오기
    const session = await getSession(request); // 추가: getSession 추가
    console.log(session);

    if (!session?.user?.email) {
      console.error("세션에서 이메일을 찾을 수 없음");
      return new NextResponse("세션에서 이메일을 찾을 수 없음", {
        status: 404,
      });
    }

    // 기존 사용자 정보를 찾아서 arrived_info 업데이트
    const user = await User.findOneAndUpdate(
      { email: session.user.email },
      { $set: { arrived_info } },
      { new: true } // 업데이트 후의 문서를 반환하도록 설정
    );

    if (!user) {
      console.error("사용자를 찾을 수 없음");
      return new NextResponse("사용자를 찾을 수 없음", { status: 404 });
    }

    return new NextResponse("주소가 성공적으로 업데이트되었습니다", {
      status: 200,
    });
  } catch (error) {
    console.error("주소를 업데이트하는 중 오류 발생:", error);
    return new NextResponse("주소를 업데이트하는 중 오류 발생", {
      status: 500,
    });
  }
};
