import { Container, Grid } from "@mui/material";
import ShopLayout2 from "@/app/components/layouts/ShopLayout2";
import Card1 from "@/app/components/Card1";
import { getNoticeData } from "@/app/lib/data";
import NoticeEdit from "@/app/components/project/NoticeEdit";

const NoticeEditPage = async ({ params }: any) => {
  const data = await getNoticeData(params.id);

  return (
    <ShopLayout2>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Container sx={{ my: "1.5rem" }}>
            <Card1>
              <NoticeEdit data={data} />
            </Card1>
          </Container>
        </Grid>
      </Grid>
    </ShopLayout2>
  );
};

export default NoticeEditPage;
