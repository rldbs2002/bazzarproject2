"use client";

import { Box, Button, Container, Grid } from "@mui/material";
import { Link as Scroll } from "react-scroll";
import HelpIcon from "@mui/icons-material/Help";
import DoneIcon from "@mui/icons-material/Done";
import LazyImage from "../components/LazyImage";
import { FlexBox, FlexRowCenter } from "../components/flex-box";
import { H1, Paragraph, Span } from "../components/Typography";
import Link from "next/link";
import { Circle } from "@mui/icons-material";

const Section1 = () => {
  return (
    <Box bgcolor="white">
      <Container
        id="section-1"
        sx={{ mt: 7, position: "relative", maxWidth: "80%", mx: "auto" }}
      >
        <Box maxWidth="830px" mx="auto" mb={12} textAlign="center">
          <H1 fontSize="40px" mb={3}>
            <Span>send your k-culture product</Span>
            <Box color="primary.main" lineHeight={1.2}>
              quickly and safely
            </Box>
          </H1>

          <Paragraph
            fontSize="18px"
            fontWeight={500}
            maxWidth="540px"
            mx="auto"
            mb={5}
          >
            We deliver the K-culture goods you purchased quickly and safely
            anywhere in the world you want.
          </Paragraph>

          <Box mx="auto" textAlign="center" mb="3rem">
            {[
              "You buy K-culture goods and we send them to you",
              "We will buy and send you the k-culture goods you need",
              "We will make a bulk purchase of the product you want",
            ].map((text, index) => (
              <FlexBox
                key={index}
                sx={{
                  justifyContent: "center",
                  my: 2,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box sx={{ minWidth: "20px", mr: "0.5rem" }}>
                    {" "}
                    {/* 고정 너비 */}
                    <Circle color="primary" sx={{ fontSize: "8px" }} />
                  </Box>
                  {text}
                </Box>
              </FlexBox>
            ))}
          </Box>

          <FlexBox justifyContent="center" mb={3}>
            <Link href="/howtouse">
              <Button
                variant="outlined"
                color="primary"
                size="large"
                sx={{ m: "0.5rem" }}
              >
                How To Use
              </Button>
            </Link>
          </FlexBox>
        </Box>
      </Container>
    </Box>
  );
};

export default Section1;
