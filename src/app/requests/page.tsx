import { Container, Grid } from "@mui/material";
import ShopLayout2 from "../components/layouts/ShopLayout2";
import SEO from "../components/SEO";
import RefundRequest from "../components/project/RefundRequest";

const RequestsPage = async () => {
  return (
    <ShopLayout2>
      <SEO title="Checkout alternative" />
      <Container sx={{ my: "1.5rem", maxWidth: "80%", mx: "auto" }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <RefundRequest />
          </Grid>
        </Grid>
      </Container>
    </ShopLayout2>
  );
};

export default RequestsPage;
