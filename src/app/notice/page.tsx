"use client";

import { Container, Grid } from "@mui/material";
import ShopLayout2 from "../components/layouts/ShopLayout2";
import SEO from "../components/SEO";
import { NextPage } from "next";

import { useRouter } from "next/navigation";
import Card1 from "../components/Card1";
import RichTextEditor from "../components/project/RichTextEditor";
import Notice from "../components/project/Notice";

const CheckoutAlternative: NextPage = () => {
  const router = useRouter();

  return (
    <ShopLayout2>
      <SEO title="Checkout alternative" />
      <Grid container spacing={3}>
        <Grid item sm={6} xs={12}>
          <Notice />
        </Grid>
        <Grid item sm={6} xs={12}>
          <Container sx={{ my: "1.5rem" }}>
            <Card1>
              <RichTextEditor />
            </Card1>
          </Container>
        </Grid>
      </Grid>
    </ShopLayout2>
  );
};

export default CheckoutAlternative;
