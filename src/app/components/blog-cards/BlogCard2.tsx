"use client";

import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { Box, Card, styled } from "@mui/material";
import { NavLink3 } from "../nav-link";
import { FlexRowCenter } from "../flex-box";
import { H4, Paragraph } from "../Typography";

// custom styled components
const ImageBox = styled(Box)({
  cursor: "pointer",
  overflow: "hidden",
  position: "relative",
  "& img": { transition: "0.3s" },
  ":hover": { "& img": { transform: "scale(1.1)" } },
});

const DateBox = styled(FlexRowCenter)(({ theme }) => ({
  top: 30,
  left: 30,
  width: 50,
  height: 50,
  textAlign: "center",
  position: "absolute",
  boxShadow: theme.shadows[1],
  backgroundColor: theme.palette.grey[200],
}));

// =====================================================
type BlogCard2Props = {
  date: string;
  image: string;
  title: string;
};
// =====================================================

const BlogCard2: FC<BlogCard2Props> = ({ image, title, date }) => {
  return (
    <Card sx={{ borderRadius: 0, boxShadow: 2 }}>
      <ImageBox p={2} maxHeight={220}>
        <Image width={580} height={272} src={image} alt="blog-1" />

        <DateBox>
          <Paragraph width="min-content" lineHeight={1} fontWeight={600}>
            {date}
          </Paragraph>
        </DateBox>
      </ImageBox>

      <Box px={2} pt={1} pb={3}>
        <Link href="#">
          <H4 fontWeight={700}>{title}</H4>
        </Link>

        <Paragraph mt={0.5} mb={3}></Paragraph>

        <NavLink3 text="Read More" href="#" />
      </Box>
    </Card>
  );
};

export default BlogCard2;
