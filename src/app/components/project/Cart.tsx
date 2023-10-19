"use client";

import Link from "next/link";
import { NextPage } from "next";
import { Button, Card, Divider, Grid, TextField } from "@mui/material";
import SEO from "../SEO";
import { Span } from "../Typography";
import { FlexBetween, FlexBox } from "../flex-box";
import ProductCard7 from "../product-cards/ProductCard7";
import CheckoutNavLayout from "../layouts/CheckoutNavLayout";
import { useAppContext } from "@/app/contexts/AppContext";
import { currency } from "@/lib";
import { useState } from "react";
import Card1 from "../Card1";
import Typography from "@mui/material/Typography";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import CalculatorForm from "./CalculateForm";
import ArrivedUploadButton from "./ArrivedUploadButton";

const Cart: NextPage = ({ data }: any) => {
  const { state } = useAppContext();

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/client");
    },
  });

  const [isCheckedMap, setIsCheckedMap] = useState<{ [key: string]: boolean }>(
    {}
  );

  const [selectedRequest, setSelectedRequest] = useState<any | null>(null);

  const toggleCheckbox = (requestId: string) => {
    setIsCheckedMap((prevIsCheckedMap) => {
      const updatedIsCheckedMap = { ...prevIsCheckedMap };

      if (updatedIsCheckedMap[requestId]) {
        // 이미 선택된 checkbox를 클릭한 경우, 이를 해제합니다.
        updatedIsCheckedMap[requestId] = false;
        setSelectedRequest(null);
      } else {
        // 새로운 checkbox를 선택한 경우, 모든 checkbox를 초기화하고 현재 checkbox만 선택합니다.
        Object.keys(updatedIsCheckedMap).forEach((key) => {
          updatedIsCheckedMap[key] = false;
        });
        updatedIsCheckedMap[requestId] = true;

        // 선택한 요청 데이터를 찾아서 selectedRequest 상태 변수에 저장합니다.
        const selectedRequestData = data.find(
          (item) => item.request_id === requestId
        );
        setSelectedRequest(selectedRequestData);
      }

      return updatedIsCheckedMap; // 업데이트된 isCheckedMap 반환
    });
  };

  const getTotalValue = (requestId: string) => {
    const cartItem = data.find((item) => item.request_id === requestId);
    if (cartItem) {
      const totalValue = cartItem.request_info.product_list.reduce(
        (accumulator, product) => accumulator + product.totalValueUSD,
        0
      );
      return totalValue;
    }
    return 0; // Return 0 if request_id is not found in the cart
  };

  // Function to calculate the total price of checked items
  const getTotalPrice = () => {
    let totalPrice = 0;

    // 선택된 항목의 request_id 배열을 추출합니다.
    const selectedRequestIds = Object.keys(isCheckedMap).filter(
      (requestId) => isCheckedMap[requestId]
    );

    // 각 선택된 request_id에 대한 가격을 계산하여 더합니다.
    selectedRequestIds.forEach((requestId) => {
      totalPrice += getTotalValue(requestId);
    });

    return totalPrice;
  };

  return (
    <CheckoutNavLayout>
      <SEO title="Cart" />

      <Grid container spacing={3}>
        {/* CART PRODUCT LIST */}
        <Grid item md={8} xs={12}>
          <Card1 sx={{ mb: 4 }}>
            <Typography
              fontSize="40px"
              style={{ textAlign: "left", marginBottom: "1.5rem" }}
            >
              Cart
            </Typography>
            {data
              .filter((item) => item.status >= 2)
              .map((item) => (
                <ProductCard7
                  key={item.id}
                  {...item}
                  isChecked={isCheckedMap[item.request_id]}
                  onToggleCheckbox={() => toggleCheckbox(item.request_id)}
                />
              ))}
          </Card1>
        </Grid>

        {/* CHECKOUT FORM */}
        <Grid item md={4} xs={12}>
          <Card sx={{ padding: 3 }}>
            <FlexBetween mb={2}>
              <Span color="grey.600">Total:</Span>
              <Span fontSize={18} fontWeight={600} lineHeight="1">
                {currency(getTotalPrice())}
              </Span>
            </FlexBetween>
            <Divider sx={{ mb: 2 }} />

            {session?.user.role === "admin" && (
              // 여기에서 'admin' 역할 사용자에게만 표시할 내용 추가
              <>
                <CalculatorForm data={data} selectedRequest={selectedRequest} />
                <ArrivedUploadButton
                  data={data}
                  selectedRequest={selectedRequest}
                />
              </>
            )}

            <Button
              fullWidth
              color="primary"
              href="/checkout"
              variant="contained"
            >
              Checkout Now
            </Button>
          </Card>
        </Grid>
      </Grid>
    </CheckoutNavLayout>
  );
};

export default Cart;
