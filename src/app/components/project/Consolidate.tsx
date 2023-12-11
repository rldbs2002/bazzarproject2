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
import { Formik, useFormik } from "formik";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import countryList from "@/app/data/countryList";
import { useSession } from "next-auth/react";
import { Product } from "../../../../type";
import { getConsolidateData } from "@/app/lib/data";
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

const Consolidate = ({ userdata }: any) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [data, setData] = useState([]);
  console.log(userdata.address_info);

  const [useDefaultAddress, setUseDefaultAddress] = useState(false);

  const initialValues = {
    arrived_info: {
      firstname: useDefaultAddress ? userdata.address_info.firstname : "",
      lastname: useDefaultAddress ? userdata.address_info.lastname : "",
      country: useDefaultAddress
        ? userdata.address_info.country
        : countryList[229],
      address: useDefaultAddress ? userdata.address_info.address : "",
      city: useDefaultAddress ? userdata.address_info.city : "",
      state: useDefaultAddress ? userdata.address_info.state : "",
      postal_code: useDefaultAddress ? userdata.address_info.postal_code : "",
      phone: useDefaultAddress ? userdata.address_info.phone : "",
    },
  };

  // Define Yup validation schema
  const checkoutSchema = yup.object().shape({
    firstname: yup.string().required("First Name is required"),
    lastname: yup.string().required("Last Name is required"),
    country: yup.string().required("Country is required"),
    address: yup.string().required("Address is required"),
    city: yup.string().required("City is required"),
    state: yup.string().required("State is required"),
    postal_code: yup.string().required("Postal Code is required"),
    phone: yup.string().required("Phone Number is required"),
  });

  const handleFormikSubmit = async (values: any) => {
    const requestData = {
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
    };

    try {
      const response = await fetch("/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.status === 201) {
        router.push("/cart");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getConsolidateData();

        setData(result);
      } catch (error: any) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  // Add a state variable to track whether the form is being submitted
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async () => {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    const cartRequestData = {
      status: 3,
      options: "consolidate",
      user: session?.user.email,
      items: data.map((item: any) => ({
        userRequest: item._id,
      })),
    };

    const userRequestData = {
      status: 4,
      requestIds: data.map((item: any) => item._id),
      request_completed_at: new Date().toISOString(),
    };

    try {
      // Send cart request
      const cartResponse = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartRequestData),
      });

      if (cartResponse.status === 200) {
        // Send user request
        const userResponse = await fetch(`/api/consolidates`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userRequestData),
        });

        if (userResponse.status === 200) {
          router.push("/cart");
        } else {
          // Handle user request failure
          console.error(
            "Error submitting user request:",
            userResponse.statusText
          );
        }
      } else {
        // Handle cart request failure
        console.error(
          "Error submitting cart request:",
          cartResponse.statusText
        );
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
              Consolidate
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
            {/* <Card1>
              <Heading number={3} title="Shipping Address" />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={useDefaultAddress}
                    onChange={() => setUseDefaultAddress(!useDefaultAddress)}
                    name="useDefaultAddress"
                  />
                }
                label="default address"
              />

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
                    <Grid container spacing={6}>
                      <Grid item sm={6} xs={12}>
                        <TextField
                          name="firstname"
                          label="First Name"
                          variant="outlined"
                          fullWidth
                          value={values.arrived_info.firstname}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            touched.arrived_info?.firstname &&
                            !!errors.arrived_info?.firstname
                          }
                          helperText={
                            (touched.arrived_info?.firstname &&
                              errors.arrived_info?.firstname) as string
                          }
                          margin="normal"
                        />
                        <TextField
                          name="lastname"
                          label="Last Name"
                          variant="outlined"
                          fullWidth
                          value={values.arrived_info.lastname}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            touched.arrived_info?.lastname &&
                            !!errors.arrived_info?.lastname
                          }
                          helperText={
                            (touched.arrived_info?.lastname &&
                              errors.arrived_info?.lastname) as string
                          }
                          margin="normal"
                        />
                        <Autocomplete
                          fullWidth
                          sx={{ mb: 2 }}
                          options={countryList}
                          value={values.arrived_info.country}
                          getOptionLabel={(option) => option.label}
                          onChange={(_, value) =>
                            setFieldValue("country", value)
                          }
                          renderInput={(params) => (
                            <TextField
                              label="Country"
                              variant="outlined"
                              placeholder="Select Country"
                              error={
                                !!touched.arrived_info?.country &&
                                !!errors.arrived_info?.country
                              }
                              helperText={
                                (touched.arrived_info?.country &&
                                  errors.arrived_info?.country) as string
                              }
                              {...params}
                            />
                          )}
                        />
                        <TextField
                          name="address"
                          label="Address"
                          variant="outlined"
                          fullWidth
                          value={values.arrived_info.address}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            touched.arrived_info?.address &&
                            !!errors.arrived_info?.address
                          }
                          helperText={
                            (touched.arrived_info?.address &&
                              errors.arrived_info?.address) as string
                          }
                          margin="normal"
                        />
                      </Grid>

                      <Grid item sm={6} xs={12}>
                        <TextField
                          name="city"
                          label="City"
                          variant="outlined"
                          fullWidth
                          value={values.arrived_info.city}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            touched.arrived_info?.city &&
                            !!errors.arrived_info?.city
                          }
                          helperText={
                            (touched.arrived_info?.city &&
                              errors.arrived_info?.city) as string
                          }
                          margin="normal"
                        />
                        <TextField
                          name="state"
                          label="State"
                          variant="outlined"
                          fullWidth
                          value={values.arrived_info.state}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            touched.arrived_info?.state &&
                            !!errors.arrived_info?.state
                          }
                          helperText={
                            (touched.arrived_info?.state &&
                              errors.arrived_info?.state) as string
                          }
                          margin="normal"
                        />
                        <TextField
                          name="postal_code"
                          label="Postal Code"
                          variant="outlined"
                          fullWidth
                          value={values.arrived_info.postal_code}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            touched.arrived_info?.postal_code &&
                            !!errors.arrived_info?.postal_code
                          }
                          helperText={
                            (touched.arrived_info?.postal_code &&
                              errors.arrived_info?.postal_code) as string
                          }
                          margin="normal"
                        />
                        <TextField
                          name="phone"
                          label="Phone Number"
                          variant="outlined"
                          fullWidth
                          value={values.arrived_info.phone}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            touched.arrived_info?.phone &&
                            !!errors.arrived_info?.phone
                          }
                          helperText={
                            (touched.arrived_info?.phone &&
                              errors.arrived_info?.phone) as string
                          }
                          margin="normal"
                        />
                      </Grid>
                    </Grid>

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
            </Card1> */}
            <Button onClick={handleFormSubmit} variant="outlined">
              Add to Cart
            </Button>
          </Container>
        </Grid>
      </Grid>
    </>
  );
};

export default Consolidate;
