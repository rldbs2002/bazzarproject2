import React from "react";
import SEO from "../components/SEO";
import ShopLayout2 from "../components/layouts/ShopLayout2";
import Checklist from "../components/project/Checklist";
import Container from "@mui/material/Container";
import { getAllCartData } from "../lib/data";

const CheckoutPage = async () => {
  const data = await getAllCartData();

  return (
    <ShopLayout2>
      <SEO title="Checkout" />
      <Container sx={{ my: "1.5rem" }}>
        <Checklist data={data} />
      </Container>
    </ShopLayout2>
  );
};

export default CheckoutPage;
