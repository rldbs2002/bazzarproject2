"use client";

import { Container, Grid } from "@mui/material";
import ShopLayout2 from "../components/layouts/ShopLayout2";
import SEO from "../components/SEO";
import { NextPage } from "next";
import CheckoutForm2 from "../components/CheckoutForm2";
import CheckoutSummary from "../components/CheckoutSummary";
import { Footer3 } from "../components/footer";

const Address: NextPage = () => {
  return (
    <ShopLayout2>
      <SEO title="Checkout alternative" />
      <Container sx={{ my: "1.5rem" }}>
        <Grid container spacing={3}>
          <Grid item lg={8} md={8} xs={12}>
            <CheckoutForm2 />
          </Grid>

          <Grid item lg={4} md={4} xs={12}>
            <CheckoutSummary />
          </Grid>
        </Grid>
      </Container>
      <Footer3 />
    </ShopLayout2>
  );
};

export default Address;
