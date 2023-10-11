"use client";

import { Container, Grid } from "@mui/material";
import ShopLayout2 from "../components/layouts/ShopLayout2";
import SEO from "../components/SEO";
import { NextPage } from "next";

import RequestForm from "../components/project/RequestForm";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Footer3 } from "../components/footer";
import Navigations from "../components/layouts/customer-dashboard/Navigations";

const NewRequestPage: NextPage = () => {
  const router = useRouter();

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/api/auth/signin?callbackUrl=/");
    },
  });

  if (!session?.user) return null;
  return (
    <ShopLayout2>
      <SEO title="Checkout alternative" />
      <Container sx={{ my: "1.5rem" }}>
        <Grid container spacing={3}>
          <Grid
            item
            lg={3}
            xs={12}
            sx={{ display: { xs: "none", sm: "none", md: "block" } }}
          >
            <Navigations />
          </Grid>
          <Grid item lg={9} xs={12}>
            <RequestForm />
          </Grid>
        </Grid>
      </Container>
    </ShopLayout2>
  );
};

export default NewRequestPage;
