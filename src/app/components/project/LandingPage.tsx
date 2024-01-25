import React from "react";
import { Box } from "@mui/material";
import Header from "@/app/landing/Header";
import Section1 from "@/app/landing/Section1";
import Section6 from "@/app/landing/Section6";
import Section8 from "@/app/landing/Section8";
import { Footer3 } from "../footer";
import SEO from "../SEO";

const LandingPage = () => {
  return (
    <>
      <Box id="top" overflow="hidden" bgcolor="background.paper">
        <Header />
        <SEO
          title="Kgoods Landing Page"
          description="Kgoods's introduction page"
        />
        <Section1 />
        <Section6 />
        <Section8 />
        <Footer3 />
      </Box>
    </>
  );
};

export default LandingPage;
