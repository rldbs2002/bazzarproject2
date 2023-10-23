"use client";

import { FC } from "react";
import Link from "next/link";
import { Add, CheckBox, Close, Remove } from "@mui/icons-material";
import { Button, Card, IconButton, styled } from "@mui/material";
import Image from "../BazaarImage";
import { Span } from "../Typography";
import { FlexBox } from "../flex-box";
import Checkbox from "@mui/material/Checkbox";

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

  isChecked,
  onToggleCheckbox,
}: any) => {
  const product_list = request_info.product_list; // Get the entire product list array

  // Calculate the total value for all items in the product_list
  const totalValue = product_list.reduce((accumulator, product) => {
    return accumulator + product.totalValueUSD;
  }, 0);

  return (
    <Wrapper>
      <FlexBox
        p={2}
        columnGap={10}
        width="100%"
        flexDirection="row"
        alignItems="center"
      >
        <Checkbox checked={isChecked} onChange={onToggleCheckbox} />
        <Span fontWeight="600" fontSize={18} style={{ width: "60px" }}>
          {request_id}
        </Span>

        <Span
          ellipsis
          fontWeight="600"
          fontSize={15}
          style={{ width: "150px" }}
        >
          {product_list.map((product) => product.name).join(", ")}
        </Span>

        <Span fontWeight={600} color="primary.main" style={{ width: "60px" }}>
          $ {totalValue}
        </Span>

        <Span mx={1} fontWeight={600} fontSize={15} style={{ width: "80px" }}>
          Status: {status}
        </Span>
      </FlexBox>
    </Wrapper>
  );
};

export default ProductCard7;
