"use client";

import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";

export default function CalculatorForm({ data, selectedCart }: any) {
  const [result, setResult] = useState("");
  const [repackingPrice, setRepackingPrice] = useState("");
  const [abroadShippingFee, setAbroadShippingFee] = useState("");

  const router = useRouter();

  const RepackingPriceChange = (event: any) => {
    setRepackingPrice(event.target.value);
  };

  const AbroadShippingFeeChange = (event: any) => {
    setAbroadShippingFee(event.target.value);
  };

  const calculateAndSubmit = async () => {
    const num3 = parseFloat(repackingPrice);
    const num4 = parseFloat(abroadShippingFee);

    let calculatedResult = 0;

    if (!isNaN(num3)) {
      calculatedResult += num3;
    }
    if (!isNaN(num4)) {
      calculatedResult += num4;
    }

    const requestUrl = `/api/cart/${selectedCart}`;

    const priceCheckData = {
      submitted_at: new Date().toISOString(),
      total_price: calculatedResult,
      repacking_price: num3,
      abroad_shipping_fee: num4,
    };

    try {
      const response = await fetch(requestUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: 3,
          price_calculate: priceCheckData,
        }),
      });

      if (response.ok) {
        setResult("서버에 제출되었습니다.");
        router.push("/");
      } else {
        setResult("서버 오류 발생");
      }
    } catch (error) {
      setResult("서버와 통신 중 오류 발생");
    }
  };

  return (
    <div>
      <h1>예상 금액 산정</h1>
      <form>
        <div>
          <TextField
            label={`Service Price`}
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
            onClick={calculateAndSubmit}
            style={{ margin: "10px 0" }}
          >
            Submit
          </Button>
        </div>
        <div>{result}</div>
      </form>
    </div>
  );
}
