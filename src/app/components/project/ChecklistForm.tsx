"use client";

import { Fragment } from "react";
import { useRouter } from "next/navigation";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { format } from "date-fns";
import { Done, ShoppingBag } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Typography,
  styled,
} from "@mui/material";
import TableRow from "../TableRow";
import Delivery from "../icons/Delivery";
import PackageBox from "../icons/PackageBox";
import TruckFilled from "../icons/TruckFilled";
import { H5, H6, Paragraph } from "../Typography";
import { FlexBetween, FlexBox } from "../flex-box";
import UserDashboardHeader from "../header/UserDashboardHeader";
import CustomerDashboardNavigation from "../layouts/customer-dashboard/Navigations";
import useWindowSize from "@/app/hooks/useWindowSize";
import { currency } from "@/lib";
import { useSession } from "next-auth/react";
import RepackingUploadButton from "./RepackingUploadButton";
import { redirect } from "next/navigation";

// styled components
const StyledFlexbox = styled(FlexBetween)(({ theme }) => ({
  flexWrap: "wrap",
  marginTop: "2rem",
  marginBottom: "2rem",
  [theme.breakpoints.down("sm")]: { flexDirection: "column" },
  "& .line": {
    height: 4,
    minWidth: 50,
    flex: "1 1 0",
    [theme.breakpoints.down("sm")]: { flex: "unset", height: 50, minWidth: 4 },
  },
}));

type OrderStatus = "Packaging" | "Shipping" | "Delivering" | "Complete";

// =============================================================
// =============================================================

const ChecklistForm: NextPage = ({ data }: any) => {
  const router = useRouter();
  const width = useWindowSize();
  const orderStatus: OrderStatus = "Shipping";
  const orderStatusList = ["Packaging", "Shipping", "Delivering", "Complete"];
  const stepIconList = [PackageBox, TruckFilled, Delivery];

  const breakpoint = 350;
  const statusIndex = orderStatusList.indexOf(orderStatus);

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/");
    },
  });

  // SECTION TITLE HEADER
  const HEADER_BUTTON = (
    <Button color="primary" sx={{ bgcolor: "primary.light", px: 4 }}>
      Order Again
    </Button>
  );

  // Show a loading state when the fallback is rendered
  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <UserDashboardHeader
        icon={ShoppingBag}
        title="Order Details"
        navigation={<CustomerDashboardNavigation />}
        button={HEADER_BUTTON}
      />

      {/* ORDER PROGRESS AREA */}
      <Card sx={{ p: "2rem 1.5rem", mb: "30px" }}>
        <StyledFlexbox>
          {stepIconList.map((Icon, ind) => (
            <Fragment key={ind}>
              <Box position="relative">
                <Avatar
                  sx={{
                    width: 64,
                    height: 64,
                    bgcolor: ind <= statusIndex ? "primary.main" : "grey.300",
                    color: ind <= statusIndex ? "grey.white" : "primary.main",
                  }}
                >
                  <Icon color="inherit" sx={{ fontSize: "32px" }} />
                </Avatar>

                {ind < statusIndex && (
                  <Box position="absolute" right="0" top="0">
                    <Avatar
                      sx={{
                        width: 22,
                        height: 22,
                        bgcolor: "grey.200",
                        color: "success.main",
                      }}
                    >
                      <Done color="inherit" sx={{ fontSize: "1rem" }} />
                    </Avatar>
                  </Box>
                )}
              </Box>

              {ind < stepIconList.length - 1 && (
                <Box
                  className="line"
                  bgcolor={ind < statusIndex ? "primary.main" : "grey.300"}
                />
              )}
            </Fragment>
          ))}
        </StyledFlexbox>

        <FlexBox justifyContent={width < breakpoint ? "center" : "flex-end"}>
          <Typography
            p="0.5rem 1rem"
            textAlign="center"
            borderRadius="300px"
            color="primary.main"
            bgcolor="primary.light"
          >
            Estimated Delivery Date <b>4th October</b>
          </Typography>
        </FlexBox>
      </Card>

      {/* ORDERED PRODUCT LIST */}
      <Card sx={{ p: 0, mb: "30px" }}>
        <TableRow
          sx={{
            p: "12px",
            borderRadius: 0,
            boxShadow: "none",
            bgcolor: "grey.200",
          }}
        >
          <FlexBox className="pre" m={0.75} alignItems="center">
            <Typography fontSize={14} color="grey.600" mr={0.5}>
              Order ID:
            </Typography>

            <Typography fontSize={14}>{data[0]._id}</Typography>
          </FlexBox>

          <FlexBox className="pre" m={0.75} alignItems="center">
            <Typography fontSize={14} color="grey.600" mr={0.5}>
              Placed on:
            </Typography>

            <Typography fontSize={14}>
              {format(new Date(data[0].createdAt), "dd MMM, yyyy")}
            </Typography>
          </FlexBox>

          <FlexBox className="pre" m={0.75} alignItems="center">
            <Typography fontSize={14} color="grey.600" mr={0.5}>
              Delivered on:
            </Typography>

            <Typography fontSize={14}>
              {format(new Date(), "dd MMM, yyyy")}
            </Typography>
          </FlexBox>
        </TableRow>

        <Box py={1}>
          {/* {order.items.map((item, ind) => (
            <FlexBox
              px={2}
              py={1}
              flexWrap="wrap"
              alignItems="center"
              key={ind}
            >
              <FlexBox flex="2 2 260px" m={0.75} alignItems="center">
                <Avatar src={item.product_img} sx={{ height: 64, width: 64 }} />
                <Box ml={2.5}>
                  <H6 my="0px">{item.product_name}</H6>

                  <Typography fontSize="14px" color="grey.600">
                    {currency(item.product_price)} x {item.product_quantity}
                  </Typography>
                </Box>
              </FlexBox>

              <FlexBox flex="1 1 260px" m={0.75} alignItems="center">
                <Typography fontSize="14px" color="grey.600">
                  Product properties: Black, L
                </Typography>
              </FlexBox>

              <FlexBox flex="160px" m={0.75} alignItems="center">
                <Button variant="text" color="primary">
                  <Typography fontSize="14px">Write a Review</Typography>
                </Button>
              </FlexBox>
            </FlexBox>
          ))} */}
        </Box>
      </Card>

      {/* SHIPPING AND ORDER SUMMERY */}
      <Grid container spacing={3}>
        <Grid item lg={6} md={6} xs={12}>
          <Card sx={{ p: "20px 30px" }}>
            <H5 mt={0} mb={2}>
              Shipping Address
            </H5>

            <Paragraph fontSize={14} my={0}>
              {}
            </Paragraph>
          </Card>
        </Grid>

        <Grid item lg={6} md={6} xs={12}>
          <Card sx={{ p: "20px 30px" }}>
            <H5 mt={0} mb={2}>
              Total Summary
            </H5>

            <FlexBetween mb={1}>
              <Typography fontSize={14} color="grey.600">
                Subtotal:
              </Typography>

              <H6 my="0px">
                {currency(
                  data[0].cart_total_price - data[0].price_calculate.total_price
                )}
              </H6>
            </FlexBetween>

            <FlexBetween mb={1}>
              <Typography fontSize={14} color="grey.600">
                Service fee:
              </Typography>

              <H6 my="0px">{currency(data[0].price_calculate.total_price)}</H6>
            </FlexBetween>

            <FlexBetween mb={2}>
              <H6 my="0px">Total</H6>
              <H6 my="0px">{currency(data[0].cart_total_price)}</H6>
            </FlexBetween>

            <Typography fontSize={14}>Paid by Credit/Debit Card</Typography>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card sx={{ padding: 3 }}>
            {session?.user.role === "admin" && (
              // 여기에서 'admin' 역할 사용자에게만 표시할 내용 추가
              <>
                <RepackingUploadButton data={data} />
              </>
            )}
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default ChecklistForm;
