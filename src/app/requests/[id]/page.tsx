import React from "react";
import Form from "@/app/components/project/Form";

import { Container, Grid } from "@mui/material";
import ShopLayout2 from "@/app/components/layouts/ShopLayout2";
import SEO from "@/app/components/SEO";
import { NextPage } from "next";
import { getRequestData } from "@/app/lib/data";

const RequestsIdPage: NextPage = async ({ params }: any) => {
  const data = await getRequestData(params.id);

  return (
    <ShopLayout2>
      <SEO title="Checkout alternative" />
      <Container sx={{ my: "1.5rem" }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Form data={data} />
          </Grid>
        </Grid>
      </Container>
    </ShopLayout2>
  );
};

export default RequestsIdPage;
