import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Users from "@/models/Users";

export const DELETE = async (request: { json: () => Promise<any> }) => {
  const requestData = await request.json();
  await connect();

  try {
    const { arrived_info, session } = requestData;

    console.log(session);

    // 기존 사용자 정보를 찾아서 arrived_info 업데이트
    const user = await Users.findOneAndUpdate(
      { email: session },
      { $push: { arrived_info: arrived_info } },
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
