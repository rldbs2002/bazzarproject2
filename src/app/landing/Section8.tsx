"use client";

import { Avatar, Box, Container, Button, Grid } from "@mui/material";
import { FlexBox } from "../components/flex-box";
import { H2, H4, Paragraph } from "../components/Typography";
import { useRouter } from "next/navigation";
import { Dispatch, FC, SetStateAction } from "react";

const list = [
  {
    title: "배송비 절감",
    thumbnail: "/assets/images/landing/niche-demos.png",
    subTitle:
      "9 Niche shop demos for online store. Super store, Fashion, Electronic, Grocery and etc",
    category: "homepage",
    buttonText: "Browse Demos",
  },
  {
    title: "빠른 배송",
    thumbnail: "/assets/images/landing/inner-pages.png",
    subTitle:
      "Clean Shop inner pages. Vendor shop, Sale/discount pages, checkout, cart and etc.",
    category: "shop",
    buttonText: "Browse Pages",
  },
  {
    title: "안전하고 신속한 배송",
    thumbnail: "/assets/images/landing/user-dashboard.png",
    subTitle:
      "Structured user dashboard for managing user account, orders, address and etc.",
    category: "user",
    buttonText: "Browse User Dashboard",
  },
  {
    title: "업계 최고의 서비스",
    thumbnail: "/assets/images/landing/admin-dashboard.png",
    subTitle: "30+ Super admin and vendor dashboard interfaces.",
    category: "admin",
    buttonText: "Browse Admin Dashboard",
  },
];

// ==================================================================
type Props = { setFilterDemo: Dispatch<SetStateAction<string>> };
// ==================================================================

const Section8: FC<Props> = ({ setFilterDemo }) => {
  const router = useRouter();
  const handleNavigate = (active: string) => () => {
    router.push("#section-3");
    setFilterDemo(active);
  };

  return (
    <Box
      mb={14}
      id="demos"
      sx={{
        background:
          "url(/assets/images/landing/landing-bg-2.svg) center/contain no-repeat",
      }}
    >
      <Container id="section-3" sx={{ position: "relative" }}>
        <Box maxWidth="830px" mx="auto" mb="2.5rem" textAlign="center">
          <H4 color="primary.main" fontSize="58px" fontWeight="700">
            BLOGS
          </H4>

          <H2
            mb={4}
            fontSize={28}
            fontWeight="700"
            textAlign="center"
            color="secondary.main"
            textTransform="uppercase"
          >
            Demos & Pages
          </H2>
        </Box>

        <Grid container spacing={6}>
          {list.map((item, index) => (
            <Grid item md={6} xs={12} key={index}>
              <FlexBox
                gap={3}
                sx={{
                  flexDirection: { sm: "row", xs: "column" },
                }}
              >
                <Avatar
                  src={item.thumbnail}
                  sx={{
                    boxShadow: 1,
                    borderRadius: "10px",
                    height: "auto",
                    width: { sm: 250, xs: "100%" },
                  }}
                />

                <FlexBox flexDirection="column" alignItems="flex-start">
                  <H2 fontSize={22} mb={1}>
                    {item.title}
                  </H2>
                  <Paragraph mb={2}>{item.subTitle}</Paragraph>
                  <Box m="auto"></Box>
                  {/* <Button
                    onClick={handleNavigate(item.category)}
                    variant="outlined"
                    color="primary"
                  >
                    {item.buttonText}
                  </Button> */}
                </FlexBox>
              </FlexBox>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Section8;
