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

const RequestForm: FC = () => {
  const router = useRouter();

  const [currentExchangeRate, setCurrentExchangeRate] = useState(""); // 환율 정보를 저장할 상태 변수
  const [currentDate, setCurrentDate] = useState(""); // 오늘 날짜를 저장할 상태 변수

  useEffect(() => {
    // 컴포넌트가 마운트될 때 환율 정보와 오늘 날짜를 가져옴
    const fetchData = async () => {
      const { exchangeRate, currentDate } = await getExchangeRateAndDate();
      setCurrentExchangeRate(exchangeRate);
      setCurrentDate(currentDate);
    };

    fetchData();
  }, []); // 빈 배열을 전달하여 한 번만 실행되도록 설정

  // KRW를 USD로 변환하는 함수
  const krwToUsd = (krwValue: number) => {
    return krwValue * Number(currentExchangeRate);
  };

  // USD를 KRW로 변환하는 함수
  const usdToKrw = (usdValue: number) => {
    return usdValue / Number(currentExchangeRate);
  };

  const initialValues = {
    tracking_number: "",
    tracking_carrier: "",
    order_number: "",
    store: "",
    firstname: "",
    lastname: "",
    country: countryList[229],
    address: "",
    city: "",
    state: "",
    postal_code: "",
    phone: "",
    product_list: [
      {
        name: "",
        type: "",
        priceKRW: "",
        priceUSD: 0,
        quantity: 0,
        totalValueUSD: 0,
        url: "",
      },
    ],
  };

  // Define Yup validation schema
  const checkoutSchema = yup.object().shape({
    tracking_number: yup.string().required("Tracking number is required"),
    tracking_carrier: yup.string().required("Carrier is required"),
    order_number: yup.string().required("Order Number is required"),
    store: yup.string().required("Merchant / Store is required"),
    firstname: yup.string().required("First Name is required"),
    lastname: yup.string().required("Last Name is required"),
    country: yup.object().required("required"),
    address: yup.string().required("Address is required"),
    city: yup.string().required("City is required"),
    state: yup.string().required("State is required"),
    postal_code: yup.string().required("Postal Code is required"),
    phone: yup.string().required("Phone Number is required"),
    product_list: yup.array().of(
      yup.object().shape({
        name: yup.string().required("Product Name is required"),
        type: yup.string().required("Product Type is required"),
        priceKRW: yup
          .number()
          .typeError("Price must be a number")
          .required("KRW is required"),
        priceUSD: yup
          .number()
          .typeError("Price must be a number")
          .required("USD is required"),
        quantity: yup
          .number()
          .typeError("Quantity must be a number")
          .required("Product Quantity is required")
          .min(0, "Quantity must be at least 0"),
        // totalValueUSD: yup
        //   .number()
        //   .typeError("Price must be a number")
        //   .required("USD is required"),
        url: yup.string().required("Product url is required"),
      })
    ),
  });

  const handleFormSubmit = async (values: any) => {
    const requestData = {
      request_info: {
        product_list: values.product_list,
        arrived_info: {
          firstname: values.firstname,
          lastname: values.lastname,
          country: values.country,
          address: values.address,
          city: values.city,
          state: values.state,
          postal_code: values.postal_code,
          phone: values.phone,
        },
        tracking_info: {
          tracking_number: values.tracking_number,
          tracking_carrier: values.tracking_carrier,
          order_number: values.order_number,
          store: values.store,
        },
      },
      status: 1,
    };

    try {
      const response = await fetch("/api/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.status === 201) {
        router.push("/order-confirmation");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <Container maxWidth="md">
      <Formik
        initialValues={initialValues}
        validationSchema={checkoutSchema}
        onSubmit={handleFormSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <Card1 sx={{ mb: 4 }}>
              <Heading number={1} title="Request Form" />
              <Grid container spacing={2}>
                <Grid item sm={6} xs={12}>
                  <TextField
                    name="tracking_number"
                    label="Tracking number"
                    variant="outlined"
                    fullWidth
                    value={values.tracking_number}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.tracking_number && !!errors.tracking_number}
                    helperText={
                      (touched.tracking_number &&
                        errors.tracking_number) as string
                    }
                    margin="normal"
                  />
                  <TextField
                    name="tracking_carrier"
                    label="Carrier"
                    variant="outlined"
                    fullWidth
                    value={values.tracking_carrier}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      touched.tracking_carrier && !!errors.tracking_carrier
                    }
                    select
                    helperText={
                      (touched.tracking_carrier &&
                        errors.tracking_carrier) as string
                    }
                    margin="normal"
                  >
                    <MenuItem value="대한통운">대한통운</MenuItem>
                    <MenuItem value="우체국">우체국</MenuItem>
                    <MenuItem value="한진택배">한진택배</MenuItem>
                    <MenuItem value="롯데택배">롯데택배</MenuItem>
                    <MenuItem value="로젠택배">로젠택배</MenuItem>
                    <MenuItem value="쿠팡">쿠팡</MenuItem>
                  </TextField>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    name="order_number"
                    label="Order Number"
                    variant="outlined"
                    fullWidth
                    value={values.order_number}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.order_number && !!errors.order_number}
                    helperText={
                      (touched.order_number && errors.order_number) as string
                    }
                    margin="normal"
                  />
                  <TextField
                    name="store"
                    label="Merchant / Store"
                    variant="outlined"
                    fullWidth
                    value={values.store}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.store && !!errors.store}
                    helperText={(touched.store && errors.store) as string}
                    margin="normal"
                    sx={{ mb: 4 }}
                  />
                </Grid>
              </Grid>

              <FieldArray name="product_list">
                {(arrayHelpers) => (
                  <>
                    <Heading number={2} title="Product List" />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        arrayHelpers.push({
                          name: "",
                          type: "",
                          priceKRW: "", // Price (KRW) 추가
                          priceUSD: 0, // Price (USD) 추가
                          quantity: 0,
                          totalValueUSD: 0,
                          url: "",
                        })
                      }
                      sx={{ mb: 2 }}
                    >
                      Add Product
                    </Button>

                    {values.product_list.map((product, index: number) => (
                      <div key={index}>
                        <Typography variant="h6">ITEM #{index + 1}</Typography>
                        {index > 0 && (
                          <div
                            style={{
                              flex: 1,
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            <HighlightOffOutlinedIcon
                              color="primary"
                              onClick={() => arrayHelpers.remove(index)}
                              sx={{ cursor: "pointer", marginBottom: "2px" }}
                            />
                          </div>
                        )}
                        <Grid container spacing={2}>
                          <Grid item sm={6} xs={12}>
                            <TextField
                              label="Product Name"
                              name={`product_list[${index}].name`}
                              variant="outlined"
                              fullWidth
                              value={product.name}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={
                                touched.product_list?.[index]?.name &&
                                !!errors.product_list?.[index]?.name
                              }
                              helperText={
                                touched.product_list?.[index]?.name &&
                                errors.product_list?.[index]?.name
                              }
                              margin="normal"
                            />
                          </Grid>
                          <Grid item sm={6} xs={12}>
                            <TextField
                              label="Product Type"
                              name={`product_list[${index}].type`}
                              variant="outlined"
                              fullWidth
                              value={product.type}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={
                                touched.product_list?.[index]?.type &&
                                !!errors.product_list?.[index]?.type
                              }
                              helperText={
                                touched.product_list?.[index]?.type &&
                                errors.product_list?.[index]?.type
                              }
                              margin="normal"
                            />
                          </Grid>
                        </Grid>
                        <Typography variant="subtitle2">
                          PRICE / UNIT
                        </Typography>
                        <Grid container spacing={2}>
                          <Grid item sm={6} xs={12}>
                            <TextField
                              label="Price (KRW)"
                              name={`product_list[${index}].priceKRW`}
                              variant="outlined"
                              fullWidth
                              value={product.priceKRW}
                              inputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    KRW
                                  </InputAdornment>
                                ),
                              }}
                              onChange={(e) => {
                                const priceKRW = Number(e.target.value) || 0;
                                const priceUSD = krwToUsd(priceKRW).toFixed(2);
                                setFieldValue(
                                  `product_list[${index}].priceKRW`,
                                  priceKRW
                                );
                                setFieldValue(
                                  `product_list[${index}].priceUSD`,
                                  priceUSD
                                );
                              }}
                              onBlur={handleBlur}
                              placeholder="Type Number"
                              error={
                                touched.product_list?.[index]?.priceKRW &&
                                !!errors.product_list?.[index]?.priceKRW
                              }
                              helperText={
                                touched.product_list?.[index]?.priceKRW &&
                                errors.product_list?.[index]?.priceKRW
                              }
                              margin="normal"
                            />
                          </Grid>
                          <Grid item sm={6} xs={12}>
                            <TextField
                              label="Price (USD)"
                              name={`product_list[${index}].priceUSD`}
                              variant="outlined"
                              fullWidth
                              inputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    USD
                                  </InputAdornment>
                                ),
                              }}
                              value={product.priceUSD}
                              onChange={(e) => {
                                const priceUSD = Number(e.target.value) || 0;
                                const priceKRW = usdToKrw(priceUSD).toFixed(2);
                                setFieldValue(
                                  `product_list[${index}].priceUSD`,
                                  priceUSD
                                );
                                setFieldValue(
                                  `product_list[${index}].priceKRW`,
                                  priceKRW
                                );
                              }}
                              margin="normal"
                              onBlur={handleBlur} // onBlur 추가
                              error={
                                touched.product_list?.[index]?.priceUSD && // error 추가
                                !!errors.product_list?.[index]?.priceUSD
                              }
                              helperText={
                                touched.product_list?.[index]?.priceUSD && // helperText 추가
                                errors.product_list?.[index]?.priceUSD
                              }
                            />
                          </Grid>
                        </Grid>

                        <FlexBox
                          flexDirection="row" // 가로 방향으로 요소를 배치
                          alignItems="center" // 요소들을 세로로 중앙 정렬
                          justifyContent="flex-end" // 요소들을 오른쪽으로 정렬
                        >
                          <Typography variant="subtitle1">
                            1 KRW = {currentExchangeRate} USD{" "}
                            {/* 환율 정보 표시 */}
                          </Typography>
                        </FlexBox>
                        <FlexBox
                          flexDirection="row" // 가로 방향으로 요소를 배치
                          alignItems="center" // 요소들을 세로로 중앙 정렬
                          justifyContent="flex-end" // 요소들을 오른쪽으로 정렬
                        >
                          <Typography variant="caption">
                            {currentDate}
                          </Typography>{" "}
                          {/* 오늘 날짜 표시 */}
                        </FlexBox>
                        <Grid container spacing={2}>
                          <Grid item sm={6} xs={12}>
                            <TextField
                              label="Product Quantity"
                              name={`product_list[${index}].quantity`}
                              type="number"
                              variant="outlined"
                              fullWidth
                              value={product.quantity}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="Type Number"
                              error={
                                touched.product_list?.[index]?.quantity &&
                                !!errors.product_list?.[index]?.quantity
                              }
                              helperText={
                                touched.product_list?.[index]?.quantity &&
                                errors.product_list?.[index]?.quantity
                              }
                              margin="normal"
                            />
                          </Grid>
                          <Grid item sm={6} xs={12}>
                            <TextField
                              label="Total Value (USD)"
                              name={`product_list[${index}].totalValueUSD`}
                              variant="outlined"
                              fullWidth
                              value={(
                                Number(product.priceUSD) *
                                Number(product.quantity)
                              ).toFixed(2)}
                              onBlur={handleBlur} // onBlur 추가
                              error={
                                touched.product_list?.[index]?.totalValueUSD && // error 추가
                                !!errors.product_list?.[index]?.totalValueUSD
                              }
                              helperText={
                                touched.product_list?.[index]?.totalValueUSD && // helperText 추가
                                errors.product_list?.[index]?.totalValueUSD
                              }
                              margin="normal"
                            />
                          </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <TextField
                              label="Product URL"
                              name={`product_list[${index}].url`}
                              variant="outlined"
                              fullWidth
                              value={product.url}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="Type Number"
                              error={
                                touched.product_list?.[index]?.url &&
                                !!errors.product_list?.[index]?.url
                              }
                              helperText={
                                touched.product_list?.[index]?.url &&
                                errors.product_list?.[index]?.url
                              }
                              margin="normal"
                            />
                          </Grid>
                        </Grid>
                      </div>
                    ))}
                  </>
                )}
              </FieldArray>
            </Card1>

            <Card1 sx={{ mb: 4 }}>
              <Heading number={3} title="Shipping Address" />
              <Grid container spacing={2}>
                <Grid item sm={6} xs={12}>
                  <TextField
                    name="firstname"
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    value={values.firstname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.firstname && !!errors.firstname}
                    helperText={
                      (touched.firstname && errors.firstname) as string
                    }
                    margin="normal"
                  />
                  <TextField
                    name="lastname"
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    value={values.lastname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.lastname && !!errors.lastname}
                    helperText={(touched.lastname && errors.lastname) as string}
                    margin="normal"
                  />

                  <TextField
                    name="address"
                    label="Address"
                    variant="outlined"
                    fullWidth
                    value={values.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.address && !!errors.address}
                    helperText={(touched.address && errors.address) as string}
                    margin="normal"
                  />

                  <Autocomplete
                    fullWidth
                    options={countryList}
                    value={values.country}
                    getOptionLabel={(option) => option.label}
                    onChange={(_, value) => setFieldValue("country", value)}
                    renderInput={(params) => (
                      <TextField
                        label="Country"
                        margin="normal"
                        variant="outlined"
                        placeholder="Select Country"
                        error={!!touched.country && !!errors.country}
                        helperText={
                          (touched.country && errors.country) as string
                        }
                        {...params}
                      />
                    )}
                  />
                </Grid>

                <Grid item sm={6} xs={12}>
                  <TextField
                    name="city"
                    label="City"
                    variant="outlined"
                    fullWidth
                    value={values.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.city && !!errors.city}
                    helperText={(touched.city && errors.city) as string}
                    margin="normal"
                  />
                  <TextField
                    name="state"
                    label="State"
                    variant="outlined"
                    fullWidth
                    value={values.state}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.state && !!errors.state}
                    helperText={(touched.state && errors.state) as string}
                    margin="normal"
                  />
                  <TextField
                    name="postal_code"
                    label="Postal Code"
                    variant="outlined"
                    fullWidth
                    value={values.postal_code}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.postal_code && !!errors.postal_code}
                    helperText={
                      (touched.postal_code && errors.postal_code) as string
                    }
                    margin="normal"
                  />
                  <TextField
                    name="phone"
                    label="Phone Number"
                    variant="outlined"
                    fullWidth
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.phone && !!errors.phone}
                    helperText={(touched.phone && errors.phone) as string}
                    margin="normal"
                  />
                </Grid>
              </Grid>
            </Card1>

            <Grid container spacing={6}>
              <Grid item sm={12} xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Container>
  );
};

export default RequestForm;
