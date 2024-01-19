"use client";

import { useEffect, useState } from "react";
import { Container, Grid } from "@mui/material";
import SEO from "../SEO";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import ShopLayout2 from "../layouts/ShopLayout2";
import { getAllCartData } from "@/app/lib/data";
import CartListItems from "./CartListItems";

const Cart = () => {
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
      <Container sx={{ my: "1.5rem", maxWidth: ["100%", "80%"], mx: "auto" }}>
        <Grid container spacing={3}>
          {/* CART PRODUCT LIST */}
          <Grid xs={12}>
            <CartListItems data={cartData} />
          </Grid>
        </Grid>
      </Container>
    </ShopLayout2>
  );
};

export default Cart;
