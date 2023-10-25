"use client";

import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";

export default function CalculatorForm({ data, selectedRequest }: any) {
  const [result, setResult] = useState("");
  const [repackingPrice, setRepackingPrice] = useState("");
  const [abroadShippingFee, setAbroadShippingFee] = useState("");

  const router = useRouter();

  const ProductPriceChange = (event: any) => {
    setProductPrice(event.target.value);
  };

  const RepackingPriceChange = (event: any) => {
    setRepackingPrice(event.target.value);
  };

  const AbroadShippingFeeChange = (event: any) => {
    setAbroadShippingFee(event.target.value);
  };

  const calculateTotal = () => {
    const num3 = parseFloat(repackingPrice);
    const num4 = parseFloat(abroadShippingFee);

    let calculatedResult = 0;

    if (!isNaN(num3)) {
      calculatedResult += num3;
    }
    if (!isNaN(num4)) {
      calculatedResult += num4;
    }

    setResult(`총 합계: ${calculatedResult}`);
  };

  const handleCalculate = () => {
    calculateTotal();
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (result !== "") {
      try {
        const requestUrl = `/api/request/${selectedRequest._id}`; // request_id에 해당하는 URL 생성
        // 클라이언트 측에서 price_check 객체 생성
        const priceCheckData = {
          submitted_at: new Date().toISOString(),
          total_price: parseFloat(result.replace("총 합계: ", "")),
          repacking_price: parseFloat(repackingPrice),
          abroad_shipping_fee: parseFloat(abroadShippingFee),
        };

        // 서버로 PUT 요청을 보냅니다.
        const response = await fetch(requestUrl, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: 3, // 3는 "price_check" 상태를 나타내는 숫자입니다.
            price_calculate: priceCheckData,
          }),
        });

        if (response.ok) {
          setResult("서버에 제출되었습니다.");
          // 페이지 리디렉션 수행
          router.push("/"); // 리디렉션할 경로로 변경
        } else {
          setResult("서버 오류 발생");
        }
      } catch (error) {
        setResult("서버와 통신 중 오류 발생");
      }
    } else {
      setResult("먼저 계산을 수행하세요.");
    }
  };

  return (
    <div>
      <h1>예상 금액 산정</h1>
      <form>
        <div>
          <TextField
            label={`Repacking Price`}
            variant="outlined"
            value={repackingPrice}
            onChange={RepackingPriceChange}
            style={{ margin: "10px 0" }}
          />
        </div>
        <div>
          <TextField
            label={`Abroad Shipping Fee`}
            variant="outlined"
            value={abroadShippingFee}
            onChange={AbroadShippingFeeChange}
            style={{ margin: "10px 0" }}
          />
        </div>

        <div>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleCalculate}
            style={{ margin: "10px 0" }}
          >
            계산하기
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleSubmit}
            style={{ margin: "10px 0" }}
          >
            제출하기
          </Button>
        </div>
        <div>{result}</div>
      </form>
    </div>
  );
}
