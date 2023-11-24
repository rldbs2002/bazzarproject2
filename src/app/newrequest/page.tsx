import { Container, Grid } from "@mui/material";
import ShopLayout2 from "../components/layouts/ShopLayout2";
import SEO from "../components/SEO";
import { NextPage } from "next";
import RequestForm from "../components/project/RequestForm";

const NewRequestPage: NextPage = () => {
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
