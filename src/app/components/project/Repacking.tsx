"use client";

import React, { FC } from "react";
import { FlexBox } from "@/app/components/flex-box";
import {
  Avatar,
  Typography,
  Grid,
  Container,
  TextField,
  Button,
} from "@mui/material";
import Card1 from "@/app/components/Card1";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import { useRouter } from "next/navigation";

type HeadingProps = { number: number; title: string };

const Heading: FC<HeadingProps> = ({ number, title }) => {
  return (
    <FlexBox gap={1.5} alignItems="center" mb={3.5}>
      <Avatar
        sx={{
          width: 32,
          height: 32,
          color: "primary.text",
          backgroundColor: "primary.main",
        }}
      >
        {number}
      </Avatar>
      <Typography fontSize="20px">{title}</Typography>
    </FlexBox>
  );
};

const Repacking = ({ data }: any) => {
  const router = useRouter();
  // const handleAddToCart = async () => {
  //   // 모든 선택한 항목을 requestData 배열에 저장
  //   const requestData = selectedItems.map((itemId) => ({
  //     add_to_cart: {
  //       options: selectedOption,
  //       total_price: getTotalPrice(),
  //     },
  //     userRequest: itemId, // 각 요청의 _id
  //     status: 2,
  //   }));

  //   try {
  //     const cartResponse = await fetch("/api/cart", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(requestData),
  //     });

  //     if (cartResponse.status === 200) {
  //       // 장바구니에 항목을 추가한 성공적인 응답을 처리합니다.
  //       router.push("/cart");
  //     } else {
  //       console.error("Error submitting data to cart:", cartResponse.status);
  //     }
  //   } catch (error) {
  //     console.error("Error submitting data:", error);
  //   }
  // };

  return (
    <Grid
      container
      spacing={3}
      style={{ position: "relative", overflowY: "auto" }}
    >
      <Grid item xs={12}>
        <Container maxWidth="md">
          <Typography
            fontSize="40px"
            style={{ textAlign: "left", marginBottom: "1.5rem" }}
          >
            Repacking
          </Typography>
          {data.map((item, index) => (
            <Card1 key={index} sx={{ mb: 4 }}>
              <Typography
                fontSize="30px"
                style={{ textAlign: "left", marginBottom: "1.5rem" }}
              >
                {item.request_id}
              </Typography>
              <Heading number={1} title="Request Form" />
              <Grid container spacing={2}>
                <Grid item sm={6} xs={12}>
                  <TextField
                    label="Tracking number"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={item.request_info.tracking_info.tracking_number}
                  />
                  <TextField
                    label="Carrier"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={item.request_info.tracking_info.tracking_carrier}
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    label="Order Number"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={item.request_info.tracking_info.order_number}
                  />
                  <TextField
                    label="Merchant / Store"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    sx={{ mb: 4 }}
                    value={item.request_info.tracking_info.store}
                  />
                </Grid>
              </Grid>

              <Heading number={2} title="Product List" />

              {item.request_info.product_list.map((product, index) => (
                <div key={index}>
                  <Typography variant="h6">ITEM #{index + 1}</Typography>
                  <Grid container spacing={2}>
                    <Grid item sm={6} xs={12}>
                      <TextField
                        label="Product Name"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={product.name}
                      />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <TextField
                        label="Product Type"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={product.type}
                      />
                    </Grid>
                  </Grid>
                  <Typography variant="subtitle2">PRICE / UNIT</Typography>
                  <Grid container spacing={2}>
                    <Grid item sm={6} xs={12}>
                      <TextField
                        label="Price (KRW)"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={product.priceKRW}
                      />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <TextField
                        label="Price (USD)"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={product.priceUSD}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item sm={6} xs={12}>
                      <TextField
                        label="Product Quantity"
                        type="number"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={product.quantity}
                      />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <TextField
                        label="Total Value (USD)"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={product.totalValueUSD}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        label="Product URL"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={product.url}
                      />
                    </Grid>
                  </Grid>
                </div>
              ))}
            </Card1>
          ))}
        </Container>
      </Grid>

      <Grid item xs={12}>
        <Card1 sx={{ mb: 4 }}>
          <Heading number={3} title="Shipping Address" />
          <Grid container spacing={2}>
            <Grid item sm={6} xs={12}>
              <TextField
                label="First Name"
                variant="outlined"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                margin="normal"
              />

              <TextField
                label="Address"
                variant="outlined"
                fullWidth
                margin="normal"
              />

              <TextField label="country" fullWidth margin="normal" />
            </Grid>

            <Grid item sm={6} xs={12}>
              <TextField
                label="City"
                variant="outlined"
                fullWidth
                margin="normal"
              />
              <TextField
                label="State"
                variant="outlined"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Postal Code"
                variant="outlined"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Phone Number"
                variant="outlined"
                fullWidth
                margin="normal"
              />
            </Grid>
          </Grid>
        </Card1>

        <Button
          variant="outlined"
          color="primary"
          /* onClick={handleAddToCart} */
          style={{ marginLeft: "2rem", width: "130px" }}
        >
          Add To Cart
        </Button>
      </Grid>
    </Grid>
  );
};

export default Repacking;
