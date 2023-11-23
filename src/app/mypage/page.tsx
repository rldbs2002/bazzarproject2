import { Container, Grid } from "@mui/material";
import ShopLayout2 from "../components/layouts/ShopLayout2";
import SEO from "../components/SEO";
import { NextPage } from "next";
import RefundRequest from "../components/project/RefundRequest";
import { getAllRequestData } from "../lib/data";

const MyPage: NextPage = async () => {
  const data = await getAllRequestData();

  return (
    <ShopLayout2>
      <SEO title="Checkout alternative" />
      <Container sx={{ my: "1.5rem" }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <RefundRequest data={data} />
          </Grid>
        </Grid>
      </Container>
    </ShopLayout2>
  );
};

export default MyPage;
