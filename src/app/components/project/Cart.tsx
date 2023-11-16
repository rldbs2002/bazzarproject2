"use client";

import { useState } from "react";
import { NextPage } from "next";
import {
  Button,
  Card,
  Container,
  Divider,
  Grid,
  TableContainer,
  Typography,
} from "@mui/material";
import SEO from "../SEO";
import { Span } from "../Typography";
import { useAppContext } from "@/app/contexts/AppContext";
import { currency } from "@/lib";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import CalculatorForm from "./CalculateForm";
import CartListItems from "./CartListItems";
import { FlexBetween } from "../flex-box";
import { useRouter } from "next/navigation";
import ShopLayout2 from "../layouts/ShopLayout2";

const Cart: NextPage = ({ data }: any) => {
  const router = useRouter();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/");
    },
  });




  return (
    <ShopLayout2>
      <SEO title="Cart" />
      <Container sx={{ my: "1.5rem" }}>
        <Grid container spacing={3}>
          {/* CART PRODUCT LIST */}
          <Grid  xs={12}>
            <Card sx={{ mb: 4 }}>
              <CartListItems
                data={data}
                session={session}
              />
            </Card>
          </Grid>

          
        </Grid>
      </Container>
    </ShopLayout2>
  );
};

export default Cart;
