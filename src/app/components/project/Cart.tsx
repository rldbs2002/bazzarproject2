"use client";

import { useState } from "react";
import { NextPage } from "next";
import { Button, Card, Divider, Grid, Typography } from "@mui/material";
import SEO from "../SEO";
import { Span } from "../Typography";
import CheckoutNavLayout from "../layouts/CheckoutNavLayout";
import { useAppContext } from "@/app/contexts/AppContext";
import { currency } from "@/lib";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import CalculatorForm from "./CalculateForm";
import CartListItems from "./CartListItems";
import { FlexBetween } from "../flex-box";

const Cart: NextPage = ({ data }: any) => {
  const { state } = useAppContext();

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/");
    },
  });

  const [selectedAccordion, setSelectedAccordion] = useState<string | null>(
    null
  );
  const [total, setTotal] = useState(0); // Store the total price

  function calculateTotalPrice(data) {
    let totalPrice = 0;

    for (const cartId in data) {
      const cartData = data[cartId];

      // Calculate the totalValueUSD for each userRequest and sum them up
      const userRequestTotal = cartData.reduce((total, userRequest) => {
        const product_list =
          userRequest.userRequest.request_info.product_list || [];

        return (
          total +
          product_list.reduce((subtotal, product) => {
            return subtotal + (product.totalValueUSD || 0);
          }, 0)
        );
      }, 0);

      const cartTotalPrice =
        cartData[0] && cartData[0].price_calculate
          ? cartData[0].price_calculate.total_price
          : 0;

      debugger;

      totalPrice += userRequestTotal + cartTotalPrice;
    }

    return totalPrice;
  }

  console.log(total);

  // Callback function for handling radio button click
  const handleRadioClick = (cartId: string | null) => {
    setSelectedAccordion(cartId);

    if (cartId !== null) {
      // Calculate and set the total price for the selected cartId
      const selectedCartData = data[cartId];
      const selectedTotal = calculateTotalPrice({ [cartId]: selectedCartData });
      setTotal(selectedTotal);
    } else {
      // No cart selected, set total price to 0
      setTotal(0);
    }
  };

  console.log(data);

  return (
    <CheckoutNavLayout>
      <SEO title="Cart" />

      <Grid container spacing={3}>
        {/* CART PRODUCT LIST */}
        <Grid item md={8} xs={12}>
          <Card sx={{ mb: 4 }}>
            <Typography
              fontSize="40px"
              style={{ textAlign: "left", marginBottom: "1.5rem" }}
            >
              Cart
            </Typography>
            <CartListItems
              data={data}
              selectedAccordion={selectedAccordion}
              setSelectedAccordion={setSelectedAccordion}
              onRadioClick={handleRadioClick} // Pass the callback function
            />
          </Card>
        </Grid>

        {/* CHECKOUT FORM */}
        <Grid item md={4} xs={12}>
          <Card sx={{ padding: 3 }}>
            {session?.user.role === "admin" && (
              <>
                <CalculatorForm
                  data={data}
                  selectedAccordion={selectedAccordion}
                />
              </>
            )}

            <Divider />

            <FlexBetween mb={2}>
              <Span color="grey.600">Total:</Span>
              <Span fontSize={18} fontWeight={600} lineHeight="1">
                {currency(total)}
              </Span>
            </FlexBetween>

            <Button
              fullWidth
              color="primary"
              variant="contained"
              onClick={() => console.log(selectedAccordion)}
            >
              Checkout Now
            </Button>
          </Card>
        </Grid>
      </Grid>
    </CheckoutNavLayout>
  );
};

export default Cart;
