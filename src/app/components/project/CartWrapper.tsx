"use client";

import React from "react";
import { Container, Grid } from "@mui/material";
import CartForm from "./CartForm";
import CalculatorForm from "./CalculateForm";
import { useRouter, redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import Price from "./Price";
import ArrivedUploadButton from "./ArrivedUploadButton";

const CartLayer = ({ data }: any) => {
  const router = useRouter();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/");
    },
  });

  const keys = Object.keys(data);
  const firstKey = keys[0];

  return (
    <Container sx={{ my: "1.5rem" }}>
      <Grid container spacing={3}>
        {/* <Grid
            item
            lg={3}
            xs={12}
            sx={{ display: { xs: "none", sm: "none", md: "block" } }}
          >
            <Navigations />
          </Grid> */}
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

export default CartLayer;