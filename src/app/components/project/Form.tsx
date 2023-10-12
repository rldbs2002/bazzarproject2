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
import countryList from "@/app/data/countryList";
import * as yup from "yup";
import { Formik, FieldArray } from "formik";
import Autocomplete from "@mui/material/Autocomplete";
import { FlexBox } from "../flex-box";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import InputAdornment from "@mui/material/InputAdornment";

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
    ); // 또는 원하는 환율 API 엔드포인트를 사용하세요.
    const data = await response.json();
    const exchangeRate = data.rates.USD.toFixed(5); // 1 KRW당 USD 환율
    const currentDate = data.date;
    return { exchangeRate, currentDate };
  } catch (error) {
    console.error("환율 정보 가져오기 실패:", error);
    return { exchangeRate: "N/A", currentDate: "N/A" };
  }
};

export default function Form({ data }: any) {
  const [currentExchangeRate, setCurrentExchangeRate] = useState(""); // 환율 정보를 저장할 상태 변수
  const [currentDate, setCurrentDate] = useState(""); // 오늘 날짜를 저장할 상태 변수

  // useEffect(() => {
  //   // 컴포넌트가 마운트될 때 환율 정보와 오늘 날짜를 가져옴
  //   const fetchData = async () => {
  //     const { exchangeRate, currentDate } = await getExchangeRateAndDate();
  //     setCurrentExchangeRate(exchangeRate);
  //     setCurrentDate(currentDate);
  //   };

  //   fetchData();
  // }, []); // 빈 배열을 전달하여 한 번만 실행되도록 설정

  return (
    <Container maxWidth="md">
      <form>
        <Card1 sx={{ mb: 4 }}>
          <Typography
            fontSize="40px"
            style={{ textAlign: "left", marginBottom: "1.5rem" }}
          >
            New Request
          </Typography>
          <Heading number={1} title="Request Form" />
          <Grid container spacing={2}>
            <Grid item sm={6} xs={12}>
              <TextField
                label="Tracking number"
                variant="outlined"
                fullWidth
                value={data.request_info.tracking_info.tracking_number}
                margin="normal"
              />
              <TextField
                label="Carrier"
                variant="outlined"
                fullWidth
                value={data.request_info.tracking_info.tracking_carrier}
                margin="normal"
              ></TextField>
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                label="Order Number"
                variant="outlined"
                fullWidth
                value={data.request_info.tracking_info.order_number}
                margin="normal"
              />
              <TextField
                label="Merchant / Store"
                variant="outlined"
                fullWidth
                value={data.request_info.tracking_info.store}
                margin="normal"
                sx={{ mb: 4 }}
              />
            </Grid>
          </Grid>
        </Card1>

        <Card1 sx={{ mb: 4 }}>
          <Heading number={2} title="Product List" />
          {data.request_info.product_list.map((product, index) => (
            <div key={index}>
              <Typography variant="h6">ITEM #{index + 1}</Typography>
              {index > 0 && (
                <div>
                  <HighlightOffOutlinedIcon
                    color="primary"
                    sx={{ cursor: "pointer", marginBottom: "2px" }}
                  />
                </div>
              )}
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
                    inputProps={{
                      endAdornment: (
                        <InputAdornment position="end">KRW</InputAdornment>
                      ),
                    }}
                    margin="normal"
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    label="Price (USD)"
                    variant="outlined"
                    fullWidth
                    value={product.priceUSD}
                    inputProps={{
                      endAdornment: (
                        <InputAdornment position="end">USD</InputAdornment>
                      ),
                    }}
                    margin="normal"
                  />
                </Grid>
              </Grid>
              <Typography variant="subtitle1">
                1 KRW = {currentExchangeRate} USD
              </Typography>
              <Typography variant="caption">{currentDate}</Typography>
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
                    value={product.totalValueUSD}
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
          ))}
        </Card1>

        <Card1 sx={{ mb: 4 }}>
          <Heading number={3} title="Shipping Address" />
          <Grid container spacing={2}>
            <Grid item sm={6} xs={12}>
              <TextField
                label="First Name"
                variant="outlined"
                fullWidth
                value={data.request_info.arrived_info.firstname}
                margin="normal"
              />
              <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                value={data.request_info.arrived_info.lastname}
                margin="normal"
              />

              <TextField
                label="Address"
                variant="outlined"
                fullWidth
                value={data.request_info.arrived_info.address}
                margin="normal"
              />

              <TextField
                label="country"
                fullWidth
                margin="normal"
                value={data.request_info.arrived_info.country.value}
              />
            </Grid>

            <Grid item sm={6} xs={12}>
              <TextField
                label="City"
                variant="outlined"
                fullWidth
                value={data.request_info.arrived_info.city}
                margin="normal"
              />
              <TextField
                label="State"
                variant="outlined"
                fullWidth
                value={data.request_info.arrived_info.state}
                margin="normal"
              />
              <TextField
                label="Postal Code"
                variant="outlined"
                fullWidth
                value={data.request_info.arrived_info.postal_code}
                margin="normal"
              />
              <TextField
                label="Phone Number"
                variant="outlined"
                fullWidth
                value={data.request_info.arrived_info.phone}
                margin="normal"
              />
            </Grid>
          </Grid>
        </Card1>

        <Grid container spacing={6}>
          <Grid item sm={12} xs={12}>
            <Button variant="outlined" color="primary" fullWidth>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
