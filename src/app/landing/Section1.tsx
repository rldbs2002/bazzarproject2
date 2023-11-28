"use client";

import { Box, Button, Container, Tooltip } from "@mui/material";
import { Link as Scroll } from "react-scroll";
import HelpIcon from "@mui/icons-material/Help";
import DoneIcon from "@mui/icons-material/Done";
import LazyImage from "../components/LazyImage";
import { FlexBox, FlexRowCenter } from "../components/flex-box";
import { H1, Paragraph, Span } from "../components/Typography";
import Link from "next/link";

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
            mb={3}
          >
            You can receive k-culture goods quickly and safely anywhere in the
            world you want.
          </Paragraph>

          <FlexRowCenter
            sx={{ mb: 5, flexDirection: { md: "row", xs: "column" } }}
          >
            <FlexBox
              my={1}
              mr={2}
              alignItems="center"
              fontWeight={500}
              color="grey.900"
            >
              <DoneIcon color="success" fontSize="small" sx={{ mr: 0.6 }} />
              배송 대행
            </FlexBox>

            <FlexBox
              my={1}
              mr={2}
              alignItems="center"
              fontWeight={500}
              color="grey.900"
            >
              <DoneIcon color="success" fontSize="small" sx={{ mr: 0.6 }} />
              구매 대행
            </FlexBox>

            <FlexBox
              my={1}
              alignItems="center"
              fontWeight={500}
              color="grey.900"
            >
              <DoneIcon color="success" fontSize="small" sx={{ mr: 0.6 }} />
              대량 구매
            </FlexBox>
          </FlexRowCenter>

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

            <Link href="/newrequest">
              <Button
                variant="outlined"
                color="primary"
                size="large"
                sx={{ m: "0.5rem" }}
              >
                New Request
              </Button>
            </Link>
          </FlexBox>
        </Box>

        <LazyImage
          priority
          alt="cover"
          width={2600}
          height={566}
          quality={100}
          src="/assets/images/landing/page-group-2.png"
          sx={{ display: "grid" }}
        />
      </Container>
    </Box>
  );
};

export default Section1;
