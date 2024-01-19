import ShopLayout2 from "../components/layouts/ShopLayout2";
import SEO from "../components/SEO";
import { Grid, Container } from "@mui/material";
import Card1 from "../components/Card1";
import RichTextEditorCreate from "../components/project/RichTextEditorCreate";

const NoticeCreatePage = () => {
  return (
    <ShopLayout2>
      <SEO title="Checkout alternative" />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Container sx={{ my: "1.5rem", maxWidth: ["100%", "80%"] }}>
            <Card1>
              <RichTextEditorCreate />
            </Card1>
          </Container>
        </Grid>
      </Grid>
    </ShopLayout2>
  );
};

export default NoticeCreatePage;
