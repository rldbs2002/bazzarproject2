import { Container, Grid } from "@mui/material";
import ShopLayout2 from "@/app/components/layouts/ShopLayout2";
import SEO from "@/app/components/SEO";
import Card1 from "@/app/components/Card1";
import { getEventData } from "@/app/lib/data";
import EventContents from "@/app/components/project/EventContents";

const EventIdPage = async ({ params }: any) => {
  const data = await getEventData(params.id);

  return (
    <ShopLayout2>
      <SEO title="Checkout alternative" />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Container sx={{ my: "1.5rem" }}>
            <Card1>
              <EventContents data={data} />
            </Card1>
          </Container>
        </Grid>
      </Grid>
    </ShopLayout2>
  );
};

export default EventIdPage;
