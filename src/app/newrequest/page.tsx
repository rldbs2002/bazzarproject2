"use client";

import { Container, Grid } from "@mui/material";
import ShopLayout2 from "../components/layouts/ShopLayout2";
import SEO from "../components/SEO";
import { NextPage } from "next";

import RequestForm from "../components/project/RequestForm";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const NewRequestPage: NextPage = () => {
  const router = useRouter();

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/api/auth/signin?callbackUrl=/");
    },
  });

  if (!session?.user)
    return (
      <ShopLayout2>
        <SEO title="Checkout alternative" />
        <Container sx={{ my: "1.5rem" }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <RequestForm />
            </Grid>
          </Grid>
        </Container>
      </ShopLayout2>
    );
};

export default NewRequestPage;
