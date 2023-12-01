"use client";

import { Box, Button, Container, Tooltip } from "@mui/material";
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
      <Container id="section-1" sx={{ mt: 12, position: "relative" }}>
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

          <Box>
            <FlexRowCenter
              sx={{ mb: 2, flexDirection: { md: "row", xs: "column" } }}
            >
              <FlexBox
                my={1}
                mr={2}
                alignItems="flex-start" // Adjusted alignment here
                fontWeight={500}
                color="grey.900"
              >
                <Circle
                  color="primary"
                  sx={{ mr: 0.6, mt: 1, fontSize: "8px" }}
                />
                You buy K-culture goods and we send them to you
              </FlexBox>
            </FlexRowCenter>

            <FlexRowCenter
              sx={{ mb: 2, flexDirection: { md: "row", xs: "column" } }}
            >
              <FlexBox
                my={1}
                mr={2}
                alignItems="flex-start" // Adjusted alignment here
                fontWeight={500}
                color="grey.900"
              >
                <Circle
                  color="primary"
                  sx={{ mr: 0.6, mt: 1, fontSize: "8px" }}
                />
                We will buy and send you the k-culture goods you need
              </FlexBox>
            </FlexRowCenter>

            <FlexRowCenter
              sx={{ mb: 2, flexDirection: { md: "row", xs: "column" } }}
            >
              <FlexBox
                my={1}
                alignItems="flex-start" // Adjusted alignment here
                fontWeight={500}
                color="grey.900"
              >
                <Circle
                  color="primary"
                  sx={{ mr: 0.6, mt: 1, fontSize: "8px" }}
                />
                We will make a bulk purchase of the product you want
              </FlexBox>
            </FlexRowCenter>
          </Box>

          <FlexBox justifyContent="center" mb={3}>
            <Scroll to="get" duration={400} offset={-72 - 16} smooth={true}>
              <Button
                variant="outlined"
                color="primary"
                size="large"
                sx={{ m: "0.5rem" }}
              >
                How To Use
              </Button>
            </Scroll>
          </FlexBox>
        </Box>

        {/* <LazyImage
          priority
          alt="cover"
          width={2600}
          height={566}
          quality={100}
          src="/assets/images/landing/page-group-2.png"
          sx={{ display: "grid" }}
        /> */}
      </Container>
    </Box>
  );
};

export default Section1;
