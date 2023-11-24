"use client";

import { NextPage } from "next";
import { Card, Container, Grid } from "@mui/material";
import SEO from "../SEO";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import CartListItems from "./CartListItems";
import { useRouter } from "next/navigation";
import ShopLayout2 from "../layouts/ShopLayout2";

const Cart = ({ data }: any) => {
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
          <Grid xs={12}>
            <Card sx={{ mb: 4 }}>
              <CartListItems data={data} session={session} />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </ShopLayout2>
  );
};

export default Cart;
