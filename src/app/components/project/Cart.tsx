"use client";

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
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import CalculatorForm from "./CalculateForm";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Form from "./Form";
import { notFound } from "next/navigation";

const Cart: NextPage = ({ data }: any) => {
  const { state } = useAppContext();

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/");
    },
  });

  // 아코디언 상태를 저장하는 변수
  const [expanded, setExpanded] = useState<number | false>(false);

  // 아코디언을 열거나 닫는 함수
  const handleAccordionChange =
    (index: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? index : false);
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
            {data.map((item, index) => (
              <Accordion key={item._id} onChange={handleAccordionChange(index)}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>{item.user}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {item.items.map((subItem) => (
                    <div key={subItem.userRequest._id}>
                      {/* 여기에서 subItem 정보를 렌더링합니다 */}
                      <p>UserRequest ID: {subItem.userRequest}</p>
                      {/* 필요한 정보를 추가로 표시하세요 */}
                      {/* <Form data={subItem.userRequest} /> */}
                    </div>
                  ))}
                </AccordionDetails>
              </Accordion>
            ))}
            {/* {data.map((item) => (
              <ProductCard7 key={item._id} {...item} />
            ))} */}
          </Card1>
        </Grid>

        {/* CHECKOUT FORM */}
        <Grid item md={4} xs={12}>
          <Card sx={{ padding: 3 }}>
            {session?.user.role === "admin" && (
              // 여기에서 'admin' 역할 사용자에게만 표시할 내용 추가
              <>
                <CalculatorForm data={data} />
              </>
            )}

            <Divider />

            <FlexBetween mb={2}>
              <Span color="grey.600">Total:</Span>
              <Span fontSize={18} fontWeight={600} lineHeight="1">
                {currency(0)}
              </Span>
            </FlexBetween>

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
