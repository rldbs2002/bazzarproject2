import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import * as yup from "yup";
import {
  Button,
  Modal,
  Card,
  Grid,
  TextField,
  Autocomplete,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import Card1 from "../Card1";
import countryList from "@/app/data/countryList";

const NewAddressModal = ({
  initialValues,
  onSubmit,
  onCancel,
  isDefault,
  onCheckboxChange,
}) => {
  // Define Yup validation schema
  const checkoutSchema = yup.object().shape({
    firstname: yup.string().required("First Name is required"),
    lastname: yup.string().required("Last Name is required"),
    country: yup.object().required("required"),
    address: yup.string().required("Address is required"),
    city: yup.string().required("City is required"),
    state: yup.string().required("State is required"),
    postal_code: yup.string().required("Postal Code is required"),
    phone: yup.string().required("Phone Number is required"),
  });

  const modalStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <Modal open onClose={onCancel} style={modalStyle}>
      <Card sx={{ maxWidth: 500, width: "100%", overflow: "auto" }}>
        <Formik
          initialValues={initialValues}
          validationSchema={checkoutSchema}
          onSubmit={(values) => {
            onSubmit({ ...values, isDefault });
          }}
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
            <Form onSubmit={handleSubmit}>
              <Card1 sx={{ mb: 4 }}>
                <Typography
                  align="center"
                  variant="h5"
                  sx={{ fontSize: "1.5rem", my: 2 }}
                >
                  Add Shipping Address
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={isDefault}
                          onChange={onCheckboxChange}
                          name="isDefault"
                        />
                      }
                      label="Set as Default Address"
                    />
                  </Grid>
                  <Grid item xs={12}>
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
              {/* ... (이전 코드와 동일) */}
              <Button
                variant="outlined"
                color="primary"
                type="submit"
                sx={{ mx: "auto", display: "block" }}
              >
                Save
              </Button>
            </Form>
          )}
        </Formik>
      </Card>
    </Modal>
  );
};

export default NewAddressModal;
