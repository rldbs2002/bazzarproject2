import { FC } from "react";
import Link from "next/link";
import {
  Box,
  Container,
  Grid,
  IconButton,
  styled,
  SxProps,
} from "@mui/material";
import AppStore from "../../components/AppStore";
import { FlexBox } from "../../components/flex-box";
import BazaarImage from "../../components/BazaarImage";
import { Paragraph } from "../../components/Typography";
import Google from "../../components/icons/Google";
import Twitter from "../../components/icons/Twitter";
import Youtube from "../../components/icons/Youtube";
import Facebook from "../../components/icons/Facebook";
import Instagram from "../../components/icons/Instagram";
import { Copyright } from "@mui/icons-material";

// styled components
const StyledFooter = styled("footer")<{ bgcolor?: string }>(
  ({ theme, bgcolor }) => ({
    color: "white",
    padding: "40px",
    background: bgcolor ? bgcolor : theme.palette.primary.main,
    // [theme.breakpoints.down("md")]: { marginBottom: "4rem" },
  })
);

const StyledLink = styled(Link)(({ theme }) => ({
  borderRadius: 4,
  display: "block",
  cursor: "pointer",
  position: "relative",
  padding: "0.3rem 0rem",
  color: theme.palette.grey[300],
  "&:hover": { color: theme.palette.grey[100] },
}));

// =================================================================
type Props = { id?: string; bgcolor?: string; sx?: SxProps };
// =================================================================

const Footer3: FC<Props> = ({ sx, id, bgcolor }) => {
  return (
    <StyledFooter id={id} sx={sx} bgcolor={bgcolor}>
      <Container>
        <Link href="/">
          <BazaarImage mb={2.5} src="/assets/images/logo.svg" alt="logo" />
        </Link>

        <Grid container spacing={6}>
          <Grid item md={4} sm={4} xs={12}>
            <Paragraph mb={2.5} color="grey.300" maxWidth="370px">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor
              libero id et, in gravida. Sit diam duis mauris nulla cursus. Erat
              et lectus vel ut sollicitudin elit at amet.
            </Paragraph>

            <Paragraph mb={2.5} color="grey.300" maxWidth="370px">
              <Copyright />
              2023 All Rights Reserved.
            </Paragraph>
          </Grid>

          <Grid item md={4} sm={4} xs={12}>
            <Box mt={-0.6}>
              {customerCareLinks.map((item, ind) => (
                <StyledLink href={item.url} key={ind}>
                  {item.title}
                </StyledLink>
              ))}
            </Box>
          </Grid>

          <Grid item md={4} sm={4} xs={12}>
            <Paragraph mb={2.5} color="grey.300" maxWidth="370px">
              Address: 14, Yongso-ro, Nam-gu, Busan, Republic of Korea
            </Paragraph>

            <Paragraph mb={2.5} color="grey.300" maxWidth="370px">
              Tel. 010 1234 5678
            </Paragraph>
          </Grid>
        </Grid>
      </Container>
    </StyledFooter>
  );
};

const customerCareLinks = [
  { title: "Introduction", url: "/introduction" },
  { title: "Notice", url: "/notice" },
  {
    title: "Blog",
    url: "/",
  },
  {
    title: "Returns & Refunds",
    url: "/",
  },
];

const iconList = [
  { icon: Facebook, url: "https://www.facebook.com/UILibOfficial" },
  { icon: Twitter, url: "https://twitter.com/uilibofficial" },
  {
    icon: Youtube,
    url: "https://www.youtube.com/channel/UCsIyD-TSO1wQFz-n2Y4i3Rg",
  },
  { icon: Google, url: "https://www.google.com/search?q=ui-lib.com" },
  { icon: Instagram, url: "https://www.instagram.com/uilibofficial/" },
];

export default Footer3;
