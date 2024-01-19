"use client";

import React from "react";
import { Container } from "@mui/material";
import CartForm from "./CartForm";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

import { AddressType, PriceCalculate, UserRequestInfo } from "type";

interface CheckoutItem {
  cartId: string;
  userRequest: UserRequestInfo;
  cartOptions: string;
  price_calculate: PriceCalculate;
  status: number;
  arrived_info: AddressType;
}

const CheckoutWrapper = ({
  data,
}: {
  data: Record<string, CheckoutItem[]>;
}) => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/");
    },
  });

  return (
    <Container sx={{ my: "1.5rem", maxWidth: ["100%", "80%"], mx: "auto" }}>
      <CartForm data={data} />
    </Container>
  );
};

export default CheckoutWrapper;
