import { Container, Grid } from "@mui/material";
import ShopLayout2 from "../components/layouts/ShopLayout2";
import SEO from "../components/SEO";
import { Paragraph } from "../components/Typography";
import MypageWrapper from "../components/project/MypageWrapper";

const MyPage = async () => {
  return (
    <ShopLayout2>
      <SEO title="Checkout alternative" />
      <Container sx={{ my: "1.5rem" }}>
        <Paragraph
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            margin: "2rem",
          }}
        >
          MyPage
        </Paragraph>
        <MypageWrapper />
      </Container>
    </ShopLayout2>
  );
};

export default MyPage;
