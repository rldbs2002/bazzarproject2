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
  Modal,
  Fade,
} from "@mui/material";
import Card1 from "@/app/components/Card1";
import { Formik, useFormik } from "formik";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import countryList from "@/app/data/countryList";

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

const SignUpForm2 = () => {
  const router = useRouter();

  const initialValues = {
    email: "", // 이 부분을 추가
    password: "", // 이 부분을 추가
    address_info: {
      firstname: "",
      lastname: "",
      country: countryList[229],
      address: "",
      city: "",
      state: "",
      postal_code: "",
      phone: "",
    },
  };

  // Define Yup validation schema
  const checkoutSchema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    firstname: yup.string().required("First Name is required"),
    lastname: yup.string().required("Last Name is required"),
    country: yup.string().required("Country is required"),
    address: yup.string().required("Address is required"),
    city: yup.string().required("City is required"),
    state: yup.string().required("State is required"),
    postal_code: yup.string().required("Postal Code is required"),
    phone: yup.string().required("Phone Number is required"),
  });

  const handleFormSubmit = async (values: any) => {
    const requestData = {
      email: values.email,
      password: values.password,
      address_info: {
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
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requestData,
        }),
      });

      if (res.status === 200) {
        router.push("/signin");
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  // Add a state variable to track whether the form is being submitted

  return (
    <>
      <div className="min-h-screen flex flex-col items-center space-y-10 p-24">
        <h1 className="text-4xl font-semibold">Sign Up</h1>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Container maxWidth="md">
              <Card1>
                <Heading number={4} title="Shipping Address" />

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
                            name="email"
                            label="Email"
                            variant="outlined"
                            fullWidth
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.email && !!errors.email}
                            helperText={
                              (touched.email && errors.email) as string
                            }
                            margin="normal"
                          />
                          <TextField
                            name="password"
                            label="Password"
                            variant="outlined"
                            fullWidth
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.password && !!errors.password}
                            helperText={
                              (touched.password && errors.password) as string
                            }
                            margin="normal"
                          />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                          <TextField
                            name="address_info.firstname"
                            label="First Name"
                            variant="outlined"
                            fullWidth
                            value={values.address_info.firstname}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              touched.address_info?.firstname &&
                              !!errors.address_info?.firstname
                            }
                            helperText={
                              (touched.address_info?.firstname &&
                                errors.address_info?.firstname) as string
                            }
                            margin="normal"
                          />
                          <TextField
                            name="address_info.lastname"
                            label="Last Name"
                            variant="outlined"
                            fullWidth
                            value={values.address_info.lastname}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              touched.address_info?.lastname &&
                              !!errors.address_info?.lastname
                            }
                            helperText={
                              (touched.address_info?.lastname &&
                                errors.address_info?.lastname) as string
                            }
                            margin="normal"
                          />
                          <Autocomplete
                            fullWidth
                            options={countryList}
                            value={values.address_info.country}
                            getOptionLabel={(option) => option.label}
                            onChange={(_, value) =>
                              setFieldValue("address_info.country", value)
                            }
                            renderInput={(params) => (
                              <TextField
                                label="Country"
                                margin="normal"
                                variant="outlined"
                                placeholder="Select Country"
                                error={
                                  !!touched.address_info?.country &&
                                  !!errors.address_info?.country
                                }
                                helperText={
                                  (touched.address_info?.country &&
                                    errors.address_info?.country) as string
                                }
                                {...params}
                              />
                            )}
                          />
                          <TextField
                            name="address_info.address"
                            label="Address"
                            variant="outlined"
                            fullWidth
                            value={values.address_info.address}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              touched.address_info?.address &&
                              !!errors.address_info?.address
                            }
                            helperText={
                              (touched.address_info?.address &&
                                errors.address_info?.address) as string
                            }
                          />
                        </Grid>

                        <Grid item sm={6} xs={12}>
                          <TextField
                            name="address_info.city"
                            label="City"
                            variant="outlined"
                            fullWidth
                            value={values.address_info.city}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              touched.address_info?.city &&
                              !!errors.address_info?.city
                            }
                            helperText={
                              (touched.address_info?.city &&
                                errors.address_info?.city) as string
                            }
                            margin="normal"
                          />
                          <TextField
                            name="address_info.state"
                            label="State"
                            variant="outlined"
                            fullWidth
                            value={values.address_info.state}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              touched.address_info?.state &&
                              !!errors.address_info?.state
                            }
                            helperText={
                              (touched.address_info?.state &&
                                errors.address_info?.state) as string
                            }
                            margin="normal"
                          />
                          <TextField
                            name="address_info.postal_code"
                            label="Postal Code"
                            variant="outlined"
                            fullWidth
                            value={values.address_info.postal_code}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              touched.address_info?.postal_code &&
                              !!errors.address_info?.postal_code
                            }
                            helperText={
                              (touched.address_info?.postal_code &&
                                errors.address_info?.postal_code) as string
                            }
                            margin="normal"
                          />
                          <TextField
                            name="address_info.phone"
                            label="Phone Number"
                            variant="outlined"
                            fullWidth
                            value={values.address_info.phone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              touched.address_info?.phone &&
                              !!errors.address_info?.phone
                            }
                            helperText={
                              (touched.address_info?.phone &&
                                errors.address_info?.phone) as string
                            }
                            margin="normal"
                          />
                        </Grid>
                      </Grid>

                      <Grid container spacing={4}>
                        <Grid item xs={12}>
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
              </Card1>
            </Container>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default SignUpForm2;
