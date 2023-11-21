import { Fragment } from "react";
import { NextPage } from "next";
import { format } from "date-fns";
import { Done, ShoppingBag } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Typography,
  styled,
} from "@mui/material";
import Delivery from "@/app/components/icons/Delivery";
import PackageBox from "@/app/components/icons/PackageBox";
import TruckFilled from "@/app/components/icons/TruckFilled";
import { H5, H6, Paragraph } from "@/app/components/Typography";
import { FlexBetween, FlexBox } from "@/app/components/flex-box";
import { currency } from "@/lib";
import { notFound } from "next/navigation";
import ShopLayout2 from "@/app/components/layouts/ShopLayout2";

import CartForm from "@/app/components/project/CartForm";
import RepackingUploadButton from "@/app/components/project/RepackingUploadButton";
import ShippingUploadButton from "@/app/components/project/ShippingUploadButton";
import ShippingForm from "@/app/components/project/ShippingForm";
import CheckoutLayer from "@/app/components/project/CheckoutWrapper";

// // styled components
// const StyledFlexbox = styled(FlexBetween)(({ theme }) => ({
//   flexWrap: "wrap",
//   marginTop: "2rem",
//   marginBottom: "2rem",
//   [theme.breakpoints.down("sm")]: { flexDirection: "column" },
//   "& .line": {
//     height: 4,
//     minWidth: 50,
//     flex: "1 1 0",
//     [theme.breakpoints.down("sm")]: { flex: "unset", height: 50, minWidth: 4 },
//   },
// }));

type OrderStatus = "Packaging" | "Shipping" | "Delivering" | "Complete";

async function getData(id: any) {
  const res = await fetch(`http://localhost:3000/api/checkout/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    return notFound();
  }
  return res.json();
}

// =============================================================
// type Props = { order: Order };
// =============================================================

const OrderDetails: NextPage = async ({ params }: any) => {
  const data = await getData(params.id);

  // SECTION TITLE HEADER

  return (
    <ShopLayout2>
      <CheckoutLayer data={data} />
    </ShopLayout2>
  );
};

export default OrderDetails;
