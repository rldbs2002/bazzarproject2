"use client";
import { useEffect, useState } from "react";

import { NextPage } from "next";
import { Card, Container, Grid } from "@mui/material";
import SEO from "../SEO";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import CartListItems from "./CartListItems";
import { useRouter } from "next/navigation";
import ShopLayout2 from "../layouts/ShopLayout2";
import { getAllCartData } from "@/app/lib/data";
import Card1 from "../Card1";
import CartListItems3 from "./CartListItems3";

const Cart = () => {
  const router = useRouter();
  const [cartData, setCartData] = useState({});

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/");
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllCartData();

        setCartData(result);
      } catch (error: any) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  console.log(cartData);

  return (
    <ShopLayout2>
      <SEO title="Cart" />
      <Container sx={{ my: "1.5rem", maxWidth: "80%", mx: "auto" }}>
        <Grid container spacing={3}>
          {/* CART PRODUCT LIST */}
          <Grid xs={12}>
            {/* <CartListItems data={cartData} /> */}
            <CartListItems3 data={cartData} />
          </Grid>
        </Grid>
      </Container>
    </ShopLayout2>
  );
};

export default Cart;
