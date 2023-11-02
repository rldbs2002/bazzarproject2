"use client";

import { FC, useEffect, useState } from "react";
import * as React from "react";
import Container from "@mui/material/Container";
import Card1 from "../Card1";
import {
  Avatar,
  Button,
  Grid,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";
import { FlexBox } from "../flex-box";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
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

// 환율과 날짜를 가져오는 함수
const getExchangeRateAndDate = async () => {
  try {
    const response = await fetch(
      "https://api.exchangerate-api.com/v4/latest/KRW"
    );
    const data = await response.json();
    const exchangeRate = data.rates.USD.toFixed(5);
    const currentDate = data.date;
    return { exchangeRate, currentDate };
  } catch (error) {
    console.error("환율 정보 가져오기 실패:", error);
    return { exchangeRate: "N/A", currentDate: "N/A" };
  }
};

const CartForm: FC = ({ data }: any) => {
  const [currentExchangeRate, setCurrentExchangeRate] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const { exchangeRate, currentDate } = await getExchangeRateAndDate();
      setCurrentExchangeRate(exchangeRate);
      setCurrentDate(currentDate);
    };

    fetchData();
  }, []);

  return (
    <Container maxWidth="md">
      {Object.keys(data).map((cartId, index) => (
        <Card1 key={index} sx={{ mb: 4 }}>
          <Typography
            fontSize="40px"
            style={{ textAlign: "left", marginBottom: "1.5rem" }}
          >
            Cart Form
          </Typography>

          {data[cartId].map((userRequest, userRequestIndex) => (
            <div key={userRequestIndex}>
              <Heading
                number={1}
                title={`#${userRequest.userRequest.request_id}`}
              />
              <Grid container spacing={2}>
                <Grid item sm={6} xs={12}>
                  <TextField
                    label="Tracking number"
                    variant="outlined"
                    fullWidth
                    value={
                      userRequest.userRequest.request_info.tracking_info
                        .tracking_number
                    }
                    margin="normal"
                  />
                  <TextField
                    label="Carrier"
                    variant="outlined"
                    fullWidth
                    value={
                      userRequest.userRequest.request_info.tracking_info
                        .tracking_carrier
                    }
                    margin="normal"
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    label="Order Number"
                    variant="outlined"
                    fullWidth
                    value={
                      userRequest.userRequest.request_info.tracking_info
                        .order_number
                    }
                    margin="normal"
                  />
                  <TextField
                    label="Merchant / Store"
                    variant="outlined"
                    fullWidth
                    value={
                      userRequest.userRequest.request_info.tracking_info.store
                    }
                    margin="normal"
                    sx={{ mb: 4 }}
                  />
                </Grid>
              </Grid>

              <Heading number={2} title="Product List" />

              {userRequest.userRequest.request_info.product_list.map(
                (product, productIndex) => (
                  <div key={productIndex}>
                    <Typography variant="h6">
                      ITEM #{productIndex + 1}
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item sm={6} xs={12}>
                        <TextField
                          label="Product Name"
                          variant="outlined"
                          fullWidth
                          value={product.name}
                          margin="normal"
                        />
                      </Grid>
                      <Grid item sm={6} xs={12}>
                        <TextField
                          label="Product Type"
                          variant="outlined"
                          fullWidth
                          value={product.type}
                          margin="normal"
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
                          value={product.priceKRW}
                          margin="normal"
                        />
                      </Grid>
                      <Grid item sm={6} xs={12}>
                        <TextField
                          label="Price (USD)"
                          variant="outlined"
                          fullWidth
                          value={product.priceUSD}
                          margin="normal"
                        />
                      </Grid>
                    </Grid>

                    <FlexBox
                      flexDirection="row"
                      alignItems="center"
                      justifyContent="flex-end"
                    >
                      <Typography variant="subtitle1">
                        1 KRW = {currentExchangeRate} USD
                      </Typography>
                    </FlexBox>
                    <FlexBox
                      flexDirection="row"
                      alignItems="center"
                      justifyContent="flex-end"
                    >
                      <Typography variant="caption">{currentDate}</Typography>
                    </FlexBox>
                    <Grid container spacing={2}>
                      <Grid item sm={6} xs={12}>
                        <TextField
                          label="Product Quantity"
                          type="number"
                          variant="outlined"
                          fullWidth
                          value={product.quantity}
                          margin="normal"
                        />
                      </Grid>
                      <Grid item sm={6} xs={12}>
                        <TextField
                          label="Total Value (USD)"
                          variant="outlined"
                          fullWidth
                          value={(
                            Number(product.priceUSD) * Number(product.quantity)
                          ).toFixed(2)}
                          margin="normal"
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          label="Product URL"
                          variant="outlined"
                          fullWidth
                          value={product.url}
                          margin="normal"
                        />
                      </Grid>
                    </Grid>
                  </div>
                )
              )}
            </div>
          ))}
        </Card1>
      ))}
    </Container>
  );
};

export default CartForm;
