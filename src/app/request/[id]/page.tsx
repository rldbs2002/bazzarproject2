import React from "react";
import Form from "@/app/components/project/Form";
import { Container, Grid } from "@mui/material";
import ShopLayout2 from "@/app/components/layouts/ShopLayout2";
import { getRequestData } from "@/app/lib/data";

const RequestIdPage = async ({ params }: any) => {
  const data = await getRequestData(params.id);

  return (
    <ShopLayout2>
      <Container sx={{ my: "1.5rem", maxWidth: ["100%", "80%"], mx: "auto" }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Form data={data} />
          </Grid>
        </Grid>
      </Container>
    </ShopLayout2>
  );
};

export default RequestIdPage;
