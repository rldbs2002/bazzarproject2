"use client";

import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";

export default function CalculatorForm({ params, data }: any) {
  const [productPrice, setProductPrice] = useState("");
  const [shippingFee, setShippingFee] = useState("");
  const [result, setResult] = useState("");
  const [repackingPrice, setRepackingPrice] = useState("");
  const [abroadShippingFee, setAbroadShippingFee] = useState("");
  const [purchaseAgentPrice, setPurchaseAgentPrice] = useState(""); // Purchase Agent Price 추가

  const [selectedCurrency, setSelectedCurrency] = useState("KRW"); // 기본 통화: 한국 원화
  const [exchangeRates, setExchangeRates] = useState({});

  const router = useRouter();

  const ProductPriceChange = (event: any) => {
    setProductPrice(event.target.value);
  };

  const ShippingFeeChange = (event: any) => {
    setShippingFee(event.target.value);
  };

  const RepackingPriceChange = (event: any) => {
    setRepackingPrice(event.target.value);
  };

  const AbroadShippingFeeChange = (event: any) => {
    setAbroadShippingFee(event.target.value);
  };

  const handlePurchaseAgentPriceChange = (event: any) => {
    setPurchaseAgentPrice(event.target.value);
  };

  const calculateTotal = () => {
    const num1 = parseFloat(productPrice);
    const num2 = parseFloat(shippingFee);
    const num3 = parseFloat(repackingPrice);
    const num4 = parseFloat(abroadShippingFee);

    let calculatedResult = 0;

    if (!isNaN(num1)) {
      calculatedResult += num1;
    }
    if (!isNaN(num2)) {
      calculatedResult += num2;
    }
    if (!isNaN(num3)) {
      calculatedResult += num3;
    }
    if (!isNaN(num4)) {
      calculatedResult += num4;
    }

    // data.agent_purchase가 true일 때 Purchase Agent Price 추가
    if (data.request_info.agent_purchase) {
      const agentPrice = parseFloat(purchaseAgentPrice);
      if (!isNaN(agentPrice)) {
        calculatedResult += agentPrice;
      }
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
        // 클라이언트 측에서 price_check 객체 생성
        const priceCheckData = {
          submitted_at: new Date().toISOString(),
          total_price: parseFloat(result.replace("총 합계: ", "")),
          repacking_price: parseFloat(repackingPrice),
          abroad_shipping_fee: parseFloat(abroadShippingFee),
          purchase_agent_price: data.request_info.agent_purchase
            ? parseFloat(purchaseAgentPrice)
            : 0, // data.agent_purchase가 true이면 값을 사용, 아니면 0
        };

        // 서버로 PUT 요청을 보냅니다.
        const response = await fetch(`/api/request/${params.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: 2, // 2는 "price_check" 상태를 나타내는 숫자입니다.
            price_calculate: priceCheckData,
          }),
        });

        if (response.ok) {
          setResult("서버에 제출되었습니다.");
          // 페이지 리디렉션 수행
          router.push("/server"); // 리디렉션할 경로로 변경
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
            label={`Product Price`}
            variant="outlined"
            value={productPrice}
            onChange={ProductPriceChange}
            style={{ margin: "10px 0" }}
          />
        </div>
        <div>
          <TextField
            label={`Shipping Fee`}
            variant="outlined"
            value={shippingFee}
            onChange={ShippingFeeChange}
            style={{ margin: "10px 0" }}
          />
        </div>
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
        {/* data.agent_purchase가 true일 때 Purchase Agent Price 입력란 보이기 */}
        {data.request_info.agent_purchase && (
          <div>
            <TextField
              label={`Purchase Agent Price `}
              variant="outlined"
              value={purchaseAgentPrice}
              onChange={handlePurchaseAgentPriceChange}
              style={{ margin: "10px 0" }}
            />
          </div>
        )}

        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCalculate}
            style={{ margin: "10px 0" }}
          >
            계산하기
          </Button>
          <Button
            variant="contained"
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
