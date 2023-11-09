"use client";

import { useState } from "react";
import { NextPage } from "next";
import {
  Button,
  Card,
  Container,
  Divider,
  Grid,
  TableContainer,
  Typography,
} from "@mui/material";
import SEO from "../SEO";
import { Span } from "../Typography";
import { useAppContext } from "@/app/contexts/AppContext";
import { currency } from "@/lib";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import CalculatorForm from "./CalculateForm";
import CartListItems from "./CartListItems";
import { FlexBetween } from "../flex-box";
import { useRouter } from "next/navigation";
import ShopLayout2 from "../layouts/ShopLayout2";

const Cart: NextPage = ({ data }: any) => {
  const router = useRouter();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/");
    },
  });

  const [selectedCart, setSelectedCart] = useState<string | null>(null);
  const [productPrice, setProductPrice] = useState(0); // Store the product price
  const [cartTotalValue, setCartTotalValue] = useState(0); // Store the cart total value
  const [cartTotalPrice, setCartTotalPrice] = useState(0); // Store the cart total price

  // Add a state variable to track whether the form is being submitted
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isPriceConfirm, setIsPriceConfirm] = useState(false); // Add state for confirmation checkbox

  const handleCheckboxChange = () => {
    setIsPriceConfirm(!isPriceConfirm);
  };

  console.log(selectedCart);

  // Calculate the product price, cart total value, and cart total price when a different cart is selected
  const calculateTotalPrice = (cartId: string) => {
    let productPrice = 0;
    let cartTotalValue = 0;
    let cartTotalPrice = 0;

    const cartData = data[cartId];

    // Calculate the totalValueUSD for each userRequest and sum them up for product price and cart total value
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

    const hasCartTotalValue = cartData[0] && cartData[0].price_calculate;

    if (hasCartTotalValue) {
      cartTotalValue = hasCartTotalValue.total_price || 0;
    }

    productPrice = userRequestTotal;
    cartTotalPrice = productPrice + cartTotalValue;

    setProductPrice(productPrice);
    setCartTotalValue(cartTotalValue);
    setCartTotalPrice(cartTotalPrice);
  };

  // Callback function for handling cart selection
  const handleCartSelect = (cartId: string) => {
    setSelectedCart(cartId);

    // Calculate the product price, cart total value, and cart total price for the selected cart
    calculateTotalPrice(cartId);
  };

  const handleFormSubmit = async (values: any) => {
    if (isSubmitting || !isPriceConfirm) {
      return; // If the form is already being submitted, exit early
    }

    setIsSubmitting(true);

    const requestData = {
      cart_total_price: cartTotalPrice,
      status: 4,
      price_confirm: isPriceConfirm,
    };

    try {
      // Add a check for confirmation before submitting
      if (isPriceConfirm) {
        const response = await fetch(`/api/cart/${selectedCart}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });

        if (response.status === 200) {
          // Redirect as needed based on server response
          router.push("/checkout");
        }
      } else {
        // Handle case where user hasn't confirmed
        console.log("Please confirm before checking out.");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ShopLayout2>
      <SEO title="Cart" />
      <Container sx={{ my: "1.5rem" }}>
        <Grid container spacing={3}>
          {/* CART PRODUCT LIST */}
          <Grid item md={8} xs={12}>
            <Card sx={{ mb: 4 }}>
              <CartListItems
                data={data}
                session={session}
                selectedCart={selectedCart}
                onCartSelect={handleCartSelect}
              />
            </Card>
          </Grid>

          {/* CHECKOUT FORM */}
          <Grid item md={4} xs={12}>
            <Card sx={{ padding: 3 }}>
              <FlexBetween mb={2}>
                <Span color="grey.600">Product Price:</Span>
                <Span fontSize={18} fontWeight={600} lineHeight="1">
                  {currency(productPrice)}
                </Span>
              </FlexBetween>

              <FlexBetween mb={2}>
                <Span color="grey.600">Service Price:</Span>
                <Span fontSize={18} fontWeight={600} lineHeight="1">
                  {cartTotalValue === 0 ? "N/A" : currency(cartTotalValue)}
                </Span>
              </FlexBetween>

              <FlexBetween mb={2}>
                <Span color="grey.600">Cart Total Price:</Span>
                <Span fontSize={18} fontWeight={600} lineHeight="1">
                  {currency(cartTotalPrice)}
                </Span>
              </FlexBetween>

              {/* Confirmation Checkbox */}
              <label>
                <input
                  type="checkbox"
                  checked={isPriceConfirm}
                  onChange={handleCheckboxChange}
                />
                Confirm Price
              </label>

              {/* Checkout Button */}

              <Button
                fullWidth
                color="primary"
                variant="outlined"
                onClick={handleFormSubmit}
                disabled={
                  !(selectedCart && data[selectedCart][0].status === 3) ||
                  !isPriceConfirm
                }
              >
                Checkout Now
              </Button>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </ShopLayout2>
  );
};

export default Cart;
