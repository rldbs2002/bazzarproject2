"use client";

import { Button } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UserConfirm({ params }: any) {
  const [isPriceConfirmed, setIsPriceConfirmed] = useState(false);
  const router = useRouter();

  const handleConfirmChange = () => {
    // 가격에 동의 여부를 토글합니다.
    setIsPriceConfirmed(!isPriceConfirmed);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (isPriceConfirmed) {
      try {
        // 클라이언트 측에서 user_confirm 데이터를 생성합니다.
        const userConfirmData = {
          submitted_at: new Date().toISOString(),
        };

        // 서버로 PUT 요청을 보냅니다.
        const response = await fetch(`/api/request/${params.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: 3, // 3은 "user_confirm" 상태를 나타내는 숫자입니다.
            user_confirm: userConfirmData,
          }),
        });

        if (response.ok) {
          // 페이지 리디렉션 수행
          router.push("/mypage"); // 리디렉션할 경로로 변경
        } else {
          console.error("서버 오류 발생");
        }
      } catch (error) {
        console.error("서버와 통신 중 오류 발생");
      }
    } else {
      // 가격 동의가 없는 경우 서버로 요청을 보내지 않음
      console.warn(
        "가격에 동의하지 않았으므로 서버로의 요청을 보내지 않습니다."
      );
    }
  };

  return (
    <div>
      <h1>가격 확인 및 동의</h1>
      <form onSubmit={handleSubmit}>
        <div>
          {/* 가격 동의 체크박스 */}
          <input
            type="checkbox"
            id="priceCheck"
            name="priceCheck"
            checked={isPriceConfirmed}
            onChange={handleConfirmChange}
          />
          <label htmlFor="priceCheck">가격에 동의합니다</label>
        </div>

        {/* 동의 제출 버튼 */}
        <div>
          <Button type="submit" variant="contained" color="primary">
            확인
          </Button>
        </div>
      </form>
    </div>
  );
}
