import { Container, Grid } from "@mui/material";
import ShopLayout2 from "@/app/components/layouts/ShopLayout2";
import SEO from "@/app/components/SEO";
import { NextPage } from "next";

import { useRouter } from "next/navigation";
import Card1 from "@/app/components/Card1";
import { getNoticeData } from "@/app/lib/data";
import NoticeContent from "@/app/components/project/NoticeContent";

const NoticeIdPage = async ({ params }: any) => {
  const data = await getNoticeData(params.id);

  return (
    <ShopLayout2>
      <SEO title="Checkout alternative" />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Container sx={{ my: "1.5rem" }}>
            <Card1>
              <NoticeContent data={data} />
            </Card1>
          </Container>
        </Grid>
      </Grid>
    </ShopLayout2>
  );
};

export default NoticeIdPage;
