import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Card, Grid, Button } from "@mui/material";
import { FlexBetween } from "../flex-box";
import { currency } from "@/lib";
import { Span } from "../Typography";

const Price = ({ data }: any) => {
  const router = useRouter();

  const [productPrice, setProductPrice] = useState(0);
  const [cartTotalValue, setCartTotalValue] = useState(0);
  const [cartTotalPrice, setCartTotalPrice] = useState(0);
  const [isPriceConfirmed, setIsPriceConfirmed] = useState(false);

  const keys = Object.keys(data);
  const firstKey = keys[0];

  console.log(firstKey);

  const handleFormSubmit = async () => {
    // Check if the price is confirmed
    if (isPriceConfirmed) {
      // Prepare the data to be sent in the PUT request
      const requestData = {
        cart_total_price: cartTotalPrice,
        price_confirm: true,
      };

      try {
        // Send a PUT request to update the cart information
        const response = await fetch(`/api/cart/${firstKey}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });

        if (response.ok) {
          // Handle successful response
          console.log("Cart information updated successfully");
          router.push("/checkout");
        } else {
          // Handle error response
          console.error("Failed to update cart information");
        }
      } catch (error) {
        console.error("Error while updating cart information", error);
      }
    } else {
      // Handle the case where the price is not confirmed
      console.warn("Price is not confirmed. Please confirm the price.");
    }
  };

  useEffect(() => {
    // Calculate productPrice, cartTotalValue, and cartTotalPrice
    let calculatedProductPrice = 0;
    let calculatedCartTotalValue = 0;

    // Iterate over each cart in data
    for (const cartId in data) {
      const cartItems = data[cartId];

      // Calculate productPrice from the sum of totalValueUSD for all product_list items
      const productPriceFromCart = cartItems.reduce(
        (sum, cartItem) =>
          sum +
          cartItem.userRequest.request_info.product_list.reduce(
            (productSum, product) => productSum + product.totalValueUSD,
            0
          ),
        0
      );

      calculatedProductPrice += productPriceFromCart;

      // Calculate cartTotalValue from price_calculate.total_price
      const cartTotalValueFromCart =
        cartItems[0].price_calculate?.total_price || 0;

      calculatedCartTotalValue += cartTotalValueFromCart;
    }

    // Set the calculated values to state variables
    setProductPrice(calculatedProductPrice);
    setCartTotalValue(calculatedCartTotalValue);

    // Set cartTotalPrice based on whether cartTotalValue is zero
    setCartTotalPrice(
      calculatedCartTotalValue === 0
        ? "N/A"
        : calculatedProductPrice + calculatedCartTotalValue
    );
  }, [data]);

  const handleCheckboxChange = () => {
    setIsPriceConfirmed(!isPriceConfirmed);
  };

  return (
    <>
      {/* CHECKOUT FORM */}
      <Grid item xs={12}>
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

          <label>
            <input
              type="checkbox"
              checked={isPriceConfirmed}
              onChange={handleCheckboxChange}
            />
            Confirm Price
          </label>

          <Button
            fullWidth
            color="primary"
            variant="outlined"
            onClick={handleFormSubmit}
            disabled={!isPriceConfirmed} // Disable the button if the price is not confirmed
          >
            Checkout Now
          </Button>
        </Card>
      </Grid>
    </>
  );
};

export default Price;
