import RequestTable from "../components/project/RequestTable";
import { Container, Grid } from "@mui/material";
import ShopLayout2 from "../components/layouts/ShopLayout2";
import SEO from "../components/SEO";
import { NextPage } from "next";
import RefundRequest from "../components/project/RefundRequest";
import { getRequestData } from "@/utils/data";

export async function getServerSideProps() {
  const data = await getRequestData();

  return {
    props: { data },
  };
}

const MyPage: NextPage = async ({ data }: any) => {
  console.log(data);
  return (
    <ShopLayout2>
      <SEO title="Checkout alternative" />
      <Container sx={{ my: "1.5rem" }}>
        <Grid container spacing={3}>
          {/* <Grid
            item
            lg={3}
            xs={12}
            sx={{ display: { xs: "none", sm: "none", md: "block" } }}
          >
            <Navigations />
          </Grid> */}
          <Grid item xs={12}>
            <RefundRequest data={data} />
          </Grid>
        </Grid>
      </Container>
    </ShopLayout2>
  );
};

export default MyPage;
