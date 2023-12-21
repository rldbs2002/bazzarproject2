"client";

import Header from "./landing/Header";
import Section1 from "./landing/Section1";
import Section6 from "./landing/Section6";
import Section8 from "./landing/Section8";
import { Footer3 } from "./components/footer";
import { Box } from "@mui/material";

const Home = () => {
  return (
    <>
      <Box id="top" overflow="hidden" bgcolor="background.paper">
        <Header />
        <Section1 />
        <Section6 />

        <Section8 />
        <Footer3 />
      </Box>
    </>
  );
};

export default Home;
