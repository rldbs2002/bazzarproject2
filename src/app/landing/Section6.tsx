"use client";

import { Avatar, Box, Container, Button, Grid } from "@mui/material";
import { FlexBox } from "../components/flex-box";
import { H2, Paragraph } from "../components/Typography";
import { useRouter } from "next/navigation";
import { Dispatch, FC, SetStateAction } from "react";
import Link from "next/link";

const BenefitsUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : "http://localhost:3000";

const list = [
  {
    title: "Reducing shipping costs",
    thumbnail: "/assets/images/landing/save-money.png",
    subTitle:
      "9 Niche shop demos for online store. Super store, Fashion, Electronic, Grocery and etc",
    category: "homepage",
    buttonText: "Browse Demos",
    link: `${BenefitsUrl}/benefits/post-01`,
  },
  {
    title: "Fast delivery",
    thumbnail: "/assets/images/landing/fast-delivery.png",
    subTitle:
      "Clean Shop inner pages. Vendor shop, Sale/discount pages, checkout, cart and etc.",
    category: "shop",
    buttonText: "Browse Pages",
    link: `${BenefitsUrl}/benefits/post-02`,
  },
  {
    title: "Safe and fast delivery",
    thumbnail: "/assets/images/landing/safe-delivery.png",
    subTitle:
      "Structured user dashboard for managing user account, orders, address and etc.",
    category: "user",
    buttonText: "Browse User Dashboard",
    link: `${BenefitsUrl}/benefits/post-03`,
  },
  {
    title: "Top Service",
    thumbnail: "/assets/images/landing/AdobeStock_604045522_Preview.png",
    subTitle: "30+ Super admin and vendor dashboard interfaces.",
    category: "admin",
    buttonText: "Browse Admin Dashboard",
    link: `${BenefitsUrl}/benefits/post-04`,
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
      <Container sx={{ py: 18, maxWidth: "80%", mx: "auto" }}>
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
                  alignItems: "flex-start",
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
                  <Link href={item.link}>
                    <div style={{ width: "100%", height: "100%" }}>
                      <H2 fontSize={22} mb={1}>
                        {item.title}
                      </H2>
                      <Paragraph mb={2}>{item.subTitle}</Paragraph>
                    </div>
                  </Link>
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
