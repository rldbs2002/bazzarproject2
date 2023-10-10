import Link from "next/link";
import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Grid, TextField, Typography } from "@mui/material";
import * as yup from "yup";
import { Formik } from "formik";
import Card1 from "./Card1";
import Autocomplete from "@mui/material/Autocomplete";

import countryList from "../data/countryList";

const CheckoutForm: FC = () => {
  const router = useRouter();

  const handleFormSubmit = async (values: any) => {
    router.push("/payment");
  };

  return (
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
            <Typography fontWeight="600" mb={2}>
              Shipping Address
            </Typography>

            <Grid container spacing={6}>
              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  sx={{ mb: 2 }}
                  label="Full Name"
                  onBlur={handleBlur}
                  name="shipping_name"
                  onChange={handleChange}
                  value={values.shipping_name}
                  error={!!touched.shipping_name && !!errors.shipping_name}
                  helperText={
                    (touched.shipping_name && errors.shipping_name) as string
                  }
                />
                <TextField
                  fullWidth
                  sx={{ mb: 2 }}
                  onBlur={handleBlur}
                  label="Phone Number"
                  onChange={handleChange}
                  name="shipping_contact"
                  value={values.shipping_contact}
                  error={
                    !!touched.shipping_contact && !!errors.shipping_contact
                  }
                  helperText={
                    (touched.shipping_contact &&
                      errors.shipping_contact) as string
                  }
                />
                <TextField
                  fullWidth
                  type="number"
                  sx={{ mb: 2 }}
                  label="Zip Code"
                  name="shipping_zip"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.shipping_zip}
                  error={!!touched.shipping_zip && !!errors.shipping_zip}
                  helperText={
                    (touched.shipping_zip && errors.shipping_zip) as string
                  }
                />
                <TextField
                  fullWidth
                  label="Address 1"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="shipping_address1"
                  value={values.shipping_address1}
                  error={
                    !!touched.shipping_address1 && !!errors.shipping_address1
                  }
                  helperText={
                    (touched.shipping_address1 &&
                      errors.shipping_address1) as string
                  }
                />
              </Grid>

              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  type="email"
                  sx={{ mb: 2 }}
                  onBlur={handleBlur}
                  name="shipping_email"
                  label="Email Address"
                  onChange={handleChange}
                  value={values.shipping_email}
                  error={!!touched.shipping_email && !!errors.shipping_email}
                  helperText={
                    (touched.shipping_email && errors.shipping_email) as string
                  }
                />
                <TextField
                  fullWidth
                  sx={{ mb: 2 }}
                  label="Company"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="shipping_company"
                  value={values.shipping_company}
                  error={
                    !!touched.shipping_company && !!errors.shipping_company
                  }
                  helperText={
                    (touched.shipping_company &&
                      errors.shipping_company) as string
                  }
                />

                <Autocomplete
                  fullWidth
                  sx={{ mb: 2 }}
                  options={countryList}
                  value={values.shipping_country}
                  getOptionLabel={(option) => option.label}
                  onChange={(_, value) =>
                    setFieldValue("shipping_country", value)
                  }
                  renderInput={(params) => (
                    <TextField
                      label="Country"
                      variant="outlined"
                      placeholder="Select Country"
                      error={
                        !!touched.shipping_country && !!errors.shipping_country
                      }
                      helperText={
                        (touched.shipping_country &&
                          errors.shipping_country) as string
                      }
                      {...params}
                    />
                  )}
                />

                <TextField
                  fullWidth
                  label="Address 2"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="shipping_address2"
                  value={values.shipping_address2}
                  error={
                    !!touched.shipping_address2 && !!errors.shipping_address2
                  }
                  helperText={
                    (touched.shipping_address2 &&
                      errors.shipping_address2) as string
                  }
                />
              </Grid>
            </Grid>
          </Card1>

          <Grid container spacing={6}>
            <Grid item sm={6} xs={12}>
              <Button
                LinkComponent={Link}
                variant="outlined"
                color="primary"
                type="button"
                href="/cart"
                fullWidth
              >
                Back to Cart
              </Button>
            </Grid>

            <Grid item sm={6} xs={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
              >
                Proceed to Payment
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

const initialValues = {
  shipping_zip: "",
  shipping_name: "",
  shipping_email: "",
  shipping_contact: "",
  shipping_company: "",
  shipping_address1: "",
  shipping_address2: "",
  shipping_country: countryList[229],
};

// uncomment these fields below for from validation
const checkoutSchema = yup.object().shape({
  // shipping_name: yup.string().required("required"),
  // shipping_email: yup.string().email("invalid email").required("required"),
  // shipping_contact: yup.string().required("required"),
  // shipping_zip: yup.string().required("required"),
  // shipping_country: yup.object().required("required"),
  // shipping_address1: yup.string().required("required"),
  // billing_name: yup.string().required("required"),
  // billing_email: yup.string().required("required"),
  // billing_contact: yup.string().required("required"),
  // billing_zip: yup.string().required("required"),
  // billing_country: yup.object().required("required"),
  // billing_address1: yup.string().required("required"),
});

export default CheckoutForm;
