"use client";

import React from "react";
import { Container, Grid } from "@mui/material";
import CartForm from "./CartForm";
import CalculatorForm from "./CalculateForm";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import Price from "./Price";
import { AddressType, PriceCalculate, UserRequestInfo } from "type";

interface CartItem {
  cartId: string;
  userRequest: UserRequestInfo;
  cartOptions: string;
  price_calculate: PriceCalculate;
  status: number;
  arrived_info: AddressType;
}

const CartWrapper = ({ data }: { data: Record<string, CartItem[]> }) => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/");
    },
  });

  return (
    <Container sx={{ my: "1.5rem" }}>
      <Grid container spacing={3}>
        <Grid item md={9} xs={12}>
          <CartForm data={data} />
        </Grid>
        <Grid item md={3} xs={12}>
          <>
            <Price data={data} style={{ marginBottom: "10px" }} />
          </>
          {session?.user.role === "admin" && (
            <>
              <CalculatorForm data={data} />
            </>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default CartWrapper;
