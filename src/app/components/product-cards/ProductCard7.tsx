"use client";

import { FC } from "react";
import Link from "next/link";
import { Add, Close, Remove } from "@mui/icons-material";
import { Button, Card, IconButton, styled } from "@mui/material";
import Image from "../BazaarImage";
import { Span } from "../Typography";
import { FlexBox } from "../flex-box";
import { useAppContext } from "@/app/contexts/AppContext";
import { currency } from "@/lib";

// styled components
const Wrapper = styled(Card)(({ theme }) => ({
  display: "flex",
  overflow: "hidden",
  alignItems: "center",
  position: "relative",
  borderRadius: "10px",
  marginBottom: "1.5rem",
  boxShadow: theme.shadows[2],
  backgroundColor: theme.palette.background.paper,

  "@media only screen and (max-width: 425px)": {
    flexWrap: "wrap",
    img: { height: "auto", minWidth: "100%" },
  },
}));

// =========================================================
type ProductCardProps = {
  qty: number;
  name: string;
  slug: string;
  price: number;
  imgUrl?: string;
  id: string | number;
};
// =========================================================

const ProductCard7 = ({
  request_id,
  status,
  _id,
  request_info,
  add_to_cart,
}: any) => {
  const product_list = request_info.product_list[0];
  console.log(request_info);
  return (
    <Wrapper>
      <FlexBox
        p={2}
        columnGap={10}
        width="100%"
        flexDirection="row"
        alignItems="center"
      >
        <Span ellipsis fontWeight="600" fontSize={18}>
          {request_id}
        </Span>

        <Span ellipsis fontWeight="600" fontSize={15}>
          {product_list.name}
        </Span>

        <Span fontWeight={600} color="primary.main">
          $ {product_list.totalValueUSD}
        </Span>

        <Span mx={1} fontWeight={600} fontSize={15}>
          Status: {status}
        </Span>
      </FlexBox>
    </Wrapper>
  );
};

export default ProductCard7;
