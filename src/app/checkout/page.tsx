import React from "react";
import SEO from "../components/SEO";
import { Card, Grid } from "@mui/material";
import ShopLayout2 from "../components/layouts/ShopLayout2";
import Checklist from "../components/project/Checklist";
import Container from "@mui/material/Container";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

async function getData() {
  const res = await fetch("http://localhost:3000/api/cart", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

const CheckoutPage = async () => {
  const data = await getData();
  // console.log(data);

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
