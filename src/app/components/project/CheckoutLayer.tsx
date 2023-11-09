"use client";

import React from "react";
import { Container } from "@mui/material";
import CartForm from "./CartForm";
import RepackingUploadButton from "./RepackingUploadButton";
import ShippingForm from "./ShippingForm";
import ShippingUploadButton from "./ShippingUploadButton";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import Card1 from "../Card1";

const CheckoutLayer = ({ data }: any) => {
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
      <CartForm data={data} />

      {session?.user.role === "admin" && (
        <Card1>
          <RepackingUploadButton data={firstKey} />
          <ShippingForm data={firstKey} />
          <ShippingUploadButton data={firstKey} />
        </Card1>
      )}
    </Container>
  );
};

export default CheckoutLayer;
