import { Container, Grid } from "@mui/material";
import ShopLayout2 from "../components/layouts/ShopLayout2";
import SEO from "../components/SEO";
import RequestForm from "../components/project/RequestForm";

const NewRequestPage = () => {
  return (
    <ShopLayout2>
      <SEO title="Checkout alternative" />
      <Container sx={{ my: "1.5rem", maxWidth: ["100%", "80%"], mx: "auto" }}>
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
