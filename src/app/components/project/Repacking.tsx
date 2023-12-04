"use client";

import React, { FC, useState, useEffect } from "react";
import { FlexBox } from "@/app/components/flex-box";
import {
  Avatar,
  Typography,
  Grid,
  Container,
  TextField,
  Button,
  Autocomplete,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import Card1 from "@/app/components/Card1";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import countryList from "@/app/data/countryList";
import { Product } from "../../../../type";
import { useSession } from "next-auth/react";
import { getRepackingData } from "@/app/lib/data";
import { Paragraph } from "../Typography";

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

const Repacking = ({ userdata }: any) => {
  const router = useRouter();
  const { data: session } = useSession();

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getRepackingData();

        setData(result);
      } catch (error: any) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  // Add a state variable to track whether the form is being submitted
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update state to store user's default address
  const [isDefaultAddress, setIsDefaultAddress] = useState(false);
  const [defaultAddressData, setDefaultAddressData] = useState({
    firstname: "",
    lastname: "",
    country: countryList[229],
    address: "",
    city: "",
    state: "",
    postal_code: "",
    phone: "",
  });

  const initialValues = {
    firstname: "",
    lastname: "",
    country: countryList[229],
    address: "",
    city: "",
    state: "",
    postal_code: "",
    phone: "",
  };

  // Define Yup validation schema
  const checkoutSchema = yup.object().shape({
    // firstname: yup.string().required("First Name is required"),
    // lastname: yup.string().required("Last Name is required"),
    // country: yup.object().required("required"),
    // address: yup.string().required("Address is required"),
    // city: yup.string().required("City is required"),
    // state: yup.string().required("State is required"),
    // postal_code: yup.string().required("Postal Code is required"),
    // phone: yup.string().required("Phone Number is required"),
  });

  const handleFormSubmit = async (values: any) => {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    const cartRequestData = {
      arrived_info: isDefaultAddress
        ? userdata.arrived_info[0] // 사용자의 첫 번째 주소를 사용
        : {
            firstname: values.firstname,
            lastname: values.lastname,
            country: values.country,
            address: values.address,
            city: values.city,
            state: values.state,
            postal_code: values.postal_code,
            phone: values.phone,
          },
      status: 2,
      options: "repacking",
      items: data.map((item: any) => ({
        userRequest: item._id,
      })),
    };

    const userRequestData = {
      arrived_info: isDefaultAddress
        ? userdata.arrived_info[0]
        : {
            firstname: values.firstname,
            lastname: values.lastname,
            country: values.country,
            address: values.address,
            city: values.city,
            state: values.state,
            postal_code: values.postal_code,
            phone: values.phone,
          },
      email: session?.user.email,
    };

    try {
      const [cartResponse, userResponse] = await Promise.all([
        fetch("/api/cart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cartRequestData),
        }),
        fetch("/api/user", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userRequestData),
        }),
      ]);

      if (cartResponse.status === 200 && userResponse.status === 200) {
        router.push("/cart");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    // Update defaultAddressData when isDefaultAddress changes
    if (isDefaultAddress) {
      setDefaultAddressData({
        firstname: userdata.arrived_info[0]?.firstname || "",
        lastname: userdata.arrived_info[0]?.lastname || "",
        country: userdata.arrived_info[0]?.country || countryList[229],
        address: userdata.arrived_info[0]?.address || "",
        city: userdata.arrived_info[0]?.city || "",
        state: userdata.arrived_info[0]?.state || "",
        postal_code: userdata.arrived_info[0]?.postal_code || "",
        phone: userdata.arrived_info[0]?.phone || "",
      });
    }
  }, [isDefaultAddress, userdata]);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Container maxWidth="md">
            <Paragraph
              style={{
                fontSize: "1.7rem",
                marginBottom: "1rem",
                fontWeight: "bold",
              }}
            >
              Repacking
            </Paragraph>
            {data.map((item: any, index: number) => (
              <Card1 key={index} sx={{ mb: 4 }}>
                <Typography
                  fontSize="30px"
                  style={{ textAlign: "left", marginBottom: "1.5rem" }}
                >
                  {item.request_id}
                </Typography>
                <Heading number={1} title="Tracking Info" />
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

                {item.request_info.product_list.map(
                  (product: Product, index: number) => (
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
                  )
                )}
              </Card1>
            ))}
          </Container>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12}>
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
                    <Heading number={3} title="Shipping Address" />
                    <Grid container spacing={3}>
                      <Grid item sm={4} xs={6}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={isDefaultAddress}
                              onChange={() =>
                                setIsDefaultAddress(!isDefaultAddress)
                              }
                              name="isDefaultAddress"
                            />
                          }
                          label="Use default address"
                        />
                      </Grid>

                      <Grid item sm={4} xs={6}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={!isDefaultAddress}
                              onChange={() =>
                                setIsDefaultAddress(!isDefaultAddress)
                              }
                              name="isNewAddress"
                            />
                          }
                          label="New Address"
                        />
                      </Grid>

                      <Grid item sm={4} xs={12}>
                        <Autocomplete
                          options={userdata.arrived_info || []}
                          getOptionLabel={(option) =>
                            `${option.firstname} ${option.lastname}`
                          }
                          value={
                            isDefaultAddress
                              ? userdata.arrived_info.find(
                                  (option: any) =>
                                    option.firstname ===
                                      defaultAddressData.firstname &&
                                    option.lastname ===
                                      defaultAddressData.lastname &&
                                    option.country.label ===
                                      defaultAddressData.country.label &&
                                    option.address ===
                                      defaultAddressData.address &&
                                    option.city === defaultAddressData.city &&
                                    option.state === defaultAddressData.state &&
                                    option.postal_code ===
                                      defaultAddressData.postal_code &&
                                    option.phone === defaultAddressData.phone
                                ) || null // 기본 주소를 찾지 못하면 null로 설정
                              : defaultAddressData // isDefaultAddress가 false인 경우 기본 주소 데이터 사용
                          }
                          isOptionEqualToValue={(option, value) =>
                            option.firstname === value.firstname &&
                            option.lastname === value.lastname &&
                            option.country.label === value.country.label &&
                            option.address === value.address &&
                            option.city === value.city &&
                            option.state === value.state &&
                            option.postal_code === value.postal_code &&
                            option.phone === value.phone
                          }
                          onChange={(_, value) => {
                            setIsDefaultAddress(!value);
                            setDefaultAddressData({
                              firstname: value?.firstname || "",
                              lastname: value?.lastname || "",
                              country: value?.country || countryList[229],
                              address: value?.address || "",
                              city: value?.city || "",
                              state: value?.state || "",
                              postal_code: value?.postal_code || "",
                              phone: value?.phone || "",
                            });

                            // 폼 필드 값을 설정합니다.
                            setFieldValue("firstname", value?.firstname || "");
                            setFieldValue("lastname", value?.lastname || "");
                            setFieldValue(
                              "country",
                              value?.country || countryList[229]
                            );
                            setFieldValue("address", value?.address || "");
                            setFieldValue("city", value?.city || "");
                            setFieldValue("state", value?.state || "");
                            setFieldValue(
                              "postal_code",
                              value?.postal_code || ""
                            );
                            setFieldValue("phone", value?.phone || "");
                          }}
                          renderInput={(params) => (
                            <TextField
                              label="Select Address"
                              margin="normal"
                              variant="outlined"
                              placeholder="Select Address"
                              error={!!touched.address && !!errors.address}
                              helperText={
                                (touched.address && errors.address) as string
                              }
                              {...params}
                            />
                          )}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item sm={6} xs={12}>
                        <TextField
                          name="firstname"
                          label="First Name"
                          variant="outlined"
                          fullWidth
                          value={
                            isDefaultAddress
                              ? defaultAddressData.firstname
                              : values.firstname
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.firstname && !!errors.firstname}
                          helperText={
                            (touched.firstname && errors.firstname) as string
                          }
                          margin="normal"
                          // Disable when using default address
                        />
                        <TextField
                          name="lastname"
                          label="Last Name"
                          variant="outlined"
                          fullWidth
                          value={
                            isDefaultAddress
                              ? defaultAddressData.lastname
                              : values.lastname
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.lastname && !!errors.lastname}
                          helperText={
                            (touched.lastname && errors.lastname) as string
                          }
                          margin="normal"
                        />

                        <TextField
                          name="address"
                          label="Address"
                          variant="outlined"
                          fullWidth
                          value={
                            isDefaultAddress
                              ? defaultAddressData.address
                              : values.address
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.address && !!errors.address}
                          helperText={
                            (touched.address && errors.address) as string
                          }
                          margin="normal"
                        />

                        <Autocomplete
                          fullWidth
                          options={countryList}
                          value={
                            isDefaultAddress
                              ? defaultAddressData.country
                              : values.country
                          }
                          getOptionLabel={(option) => option.label}
                          onChange={(_, value) =>
                            setFieldValue("country", value)
                          }
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
                          value={
                            isDefaultAddress
                              ? defaultAddressData.city
                              : values.city
                          }
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
                          value={
                            isDefaultAddress
                              ? defaultAddressData.state
                              : values.state
                          }
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
                          value={
                            isDefaultAddress
                              ? defaultAddressData.postal_code
                              : values.postal_code
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.postal_code && !!errors.postal_code}
                          helperText={
                            (touched.postal_code &&
                              errors.postal_code) as string
                          }
                          margin="normal"
                        />
                        <TextField
                          name="phone"
                          label="Phone Number"
                          variant="outlined"
                          fullWidth
                          value={
                            isDefaultAddress
                              ? defaultAddressData.phone
                              : values.phone
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.phone && !!errors.phone}
                          helperText={(touched.phone && errors.phone) as string}
                          margin="normal"
                        />
                      </Grid>
                    </Grid>
                  </Card1>

                  <Grid item xs={12} style={{ textAlign: "center" }}>
                    <Button
                      variant="outlined"
                      color="primary"
                      type="submit"
                      style={{ marginBottom: "2rem", width: "300px" }}
                      disabled={isSubmitting} // Disable the button when the form is being submitted
                    >
                      {isSubmitting ? "Submitting..." : "Add To Cart"}
                    </Button>
                  </Grid>
                </form>
              )}
            </Formik>
          </Container>
        </Grid>
      </Grid>
    </>
  );
};

export default Repacking;
