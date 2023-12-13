"use client";

import { Avatar, Box, Container, Button, Grid } from "@mui/material";
import { FlexBox } from "../components/flex-box";
import { H2, Paragraph } from "../components/Typography";
import { useRouter } from "next/navigation";
import { Dispatch, FC, SetStateAction } from "react";

const list = [
  {
    title: "배송비 절감",
    thumbnail: "/assets/images/landing/save-money.png",
    subTitle:
      "9 Niche shop demos for online store. Super store, Fashion, Electronic, Grocery and etc",
    category: "homepage",
    buttonText: "Browse Demos",
  },
  {
    title: "빠른 배송",
    thumbnail: "/assets/images/landing/fast-delivery.png",
    subTitle:
      "Clean Shop inner pages. Vendor shop, Sale/discount pages, checkout, cart and etc.",
    category: "shop",
    buttonText: "Browse Pages",
  },
  {
    title: "안전하고 신속한 배송",
    thumbnail: "/assets/images/landing/safe-delivery.png",
    subTitle:
      "Structured user dashboard for managing user account, orders, address and etc.",
    category: "user",
    buttonText: "Browse User Dashboard",
  },
  {
    title: "업계 최고의 서비스",
    thumbnail: "/assets/images/landing/AdobeStock_604045522_Preview.png",
    subTitle: "30+ Super admin and vendor dashboard interfaces.",
    category: "admin",
    buttonText: "Browse Admin Dashboard",
  },
];

// ==================================================================
type Props = { setFilterDemo: Dispatch<SetStateAction<string>> };
// ==================================================================

const Section6: FC<Props> = ({ setFilterDemo }) => {
  const router = useRouter();
  const handleNavigate = (active: string) => () => {
    router.push("#section-3");
    setFilterDemo(active);
  };

  return (
    <Box id="get" sx={{ backgroundColor: "grey.100" }}>
      <Container sx={{ py: 18 }}>
        <H2
          fontSize={28}
          textAlign="center"
          fontWeight="700"
          color="secondary.main"
          mb={8}
          textTransform="uppercase"
        >
          What are the benefits?
        </H2>

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
                    height: { sm: 200, xs: "100%" },
                    width: { sm: 250, xs: "100%" },
                  }}
                />

                <FlexBox flexDirection="column" alignItems="flex-start">
                  <div style={{ width: "100%", height: "100%" }}>
                    <H2 fontSize={22} mb={1}>
                      {item.title}
                    </H2>
                    <Paragraph mb={2}>{item.subTitle}</Paragraph>
                  </div>
                </FlexBox>
              </FlexBox>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Section6;
