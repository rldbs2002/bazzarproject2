import { Container, Grid } from "@mui/material";
import ShopLayout2 from "../components/layouts/ShopLayout2";
import RefundRequest from "../components/project/RefundRequest";

const RequestPage = () => {
  return (
    <ShopLayout2>
      <Container sx={{ my: "1.5rem", maxWidth: ["100%", "80%"], mx: "auto" }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <RefundRequest />
          </Grid>
        </Grid>
      </Container>
    </ShopLayout2>
  );
};

export default RequestPage;
