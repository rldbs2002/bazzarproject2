"use client";

import { Container, Grid } from "@mui/material";
import ShopLayout2 from "../components/layouts/ShopLayout2";
import SEO from "../components/SEO";
import { NextPage } from "next";

import RequestForm from "../components/project/RequestForm";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Footer3 } from "../components/footer";
import CustomerDashboardLayout from "../components/layouts/customer-dashboard";

const CheckoutAlternative: NextPage = () => {
  const router = useRouter();

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/api/auth/signin?callbackUrl=/");
    },
  });

  if (!session?.user) return null;
  return (
    <CustomerDashboardLayout>
      <SEO title="Checkout alternative" />
      <Grid container spacing={3}>
        <Grid item xs={12}></Grid>
      </Grid>
    </CustomerDashboardLayout>
  );
};

export default CheckoutAlternative;
