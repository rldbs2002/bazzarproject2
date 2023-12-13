"use client";

import { Avatar, Box, Container, Button, Grid } from "@mui/material";
import { FlexBox } from "../components/flex-box";
import { H2, H4, Paragraph } from "../components/Typography";
import { useRouter } from "next/navigation";
import { Dispatch, FC, SetStateAction } from "react";
import Link from "next/link";

const list = [
  {
    title: "WORLD EXPO 2023 BUSAN, KOREA",
    thumbnail: "/assets/images/landing/busan-expo.png",
    subTitle:
      "If the 2030 World Expo is hosted in Busan, Korea will become the 7th country in the world to host all three major international events: the Olympics, the World Cup, and the Registered Expo.",
    category: "homepage",
    buttonText: "Browse Demos",
    date: "2023-11-28",
    link: "http://localhost:3000/blog/post-01",
  },
  {
    title: "2023 K-CON",
    thumbnail: "/assets/images/landing/k-con.png",
    subTitle:
      "KCON Saudi Arabia 2023 will be held at Boulevard Riyadh City on October 6 and 7, and it will feature two nights of concerts with different performing artists.",
    category: "shop",
    buttonText: "Browse Pages",
    date: "2023-11-28",
    link: "http://localhost:3000/blog/post-02",
  },
  {
    title: "2023 Christmas in Korea",
    thumbnail: "/assets/images/landing/Christmas-in-Korea.png",
    subTitle:
      "In just a couple of weeks, billions of people worldwide will be celebrating the most widely celebrated holiday in the world, Christmas – and Korea is no different!",
    category: "user",
    buttonText: "Browse User Dashboard",
    date: "2023-11-28",
    link: "http://localhost:3000/blog/post-03",
  },
  {
    title: "BTS Members Are Joining The Military",
    thumbnail: "/assets/images/landing/BTS-military.png",
    subTitle:
      "The biggest boy band in the world is joining the military. Members of K-pop phenomenon BTS will be enlisting in the South Korean military through a policy known as conscription",
    category: "admin",
    buttonText: "Browse Admin Dashboard",
    date: "2023-11-28",
    link: "http://localhost:3000/blog/post-04",
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
          <H4 color="primary.main" fontSize="45px" fontWeight="700">
            BLOGS
          </H4>

          <H2
            mb={4}
            fontSize={20}
            fontWeight="700"
            textAlign="center"
            color="secondary.main"
            textTransform="uppercase"
          >
            Spotlights & Topics
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
                      <Paragraph mb={2}>{item.date}</Paragraph>
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

export default Section8;
