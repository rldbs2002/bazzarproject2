import React from "react";
import { notFound } from "next/navigation";
import CartForm from "@/app/components/project/CartForm";

import { Container, Grid } from "@mui/material";
import ShopLayout2 from "@/app/components/layouts/ShopLayout2";
import SEO from "@/app/components/SEO";
import { NextPage } from "next";

async function getData(id: any) {
  const res = await fetch(`http://localhost:3000/api/cart/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    return notFound();
  }
  return res.json();
}

const CartPage: NextPage = async ({ params }: any) => {
  const data = await getData(params.id);
  // console.log(data);

  return (
    <ShopLayout2>
      <SEO title="Checkout alternative" />
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
          <Grid item xs={12}>
            <CartForm data={data} />
          </Grid>
        </Grid>
      </Container>
    </ShopLayout2>
  );
};

export default CartPage;
