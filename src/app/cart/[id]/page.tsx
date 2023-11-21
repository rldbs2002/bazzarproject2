import React from "react";
import { notFound } from "next/navigation";
import CartForm from "@/app/components/project/CartForm";

import { Container, Grid } from "@mui/material";
import ShopLayout2 from "@/app/components/layouts/ShopLayout2";
import SEO from "@/app/components/SEO";
import { NextPage } from "next";
import CalculatorForm from "@/app/components/project/CalculateForm";
import CartLayer from "@/app/components/project/CartWrapper";

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

  return (
    <ShopLayout2>
      <SEO title="Checkout alternative" />
      <CartLayer data={data} />
    </ShopLayout2>
  );
};

export default CartPage;
