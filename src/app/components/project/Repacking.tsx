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
import NewAddressModalWrapper from "./NewAddressModalWrapper";

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

const Repacking = ({ data, userdata }: any) => {
  const router = useRouter();

  // Add a state variable to track whether the form is being submitted
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [allAddress, setAllAddress] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDefault, setIsDefault] = useState(false); // Add this line

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

    const requestData = {
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
      items: data.map((item) => ({
        userRequest: item._id,
      })),
    };

    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData), // 배열로 감싸 전송
      });

      if (response.status === 200) {
        router.push("/cart");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddressSubmit = async (values: any) => {
    const newAddress = {
      firstname: values.firstname,
      lastname: values.lastname,
      country: values.country,
      address: values.address,
      city: values.city,
      state: values.state,
      postal_code: values.postal_code,
      phone: values.phone,
    };

    try {
      const response = await fetch("/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          arrived_info: isDefault
            ? [newAddress, ...allAddress]
            : [...allAddress, newAddress],
          email: session?.user.email,
        }),
      });

      if (response.status === 200) {
        console.log("주소가 성공적으로 추가되었습니다!");
        setAllAddress((prevAllAddress) =>
          isDefault
            ? [newAddress, ...prevAllAddress]
            : [...prevAllAddress, newAddress]
        );
        setIsAddModalOpen(false);
      } else {
        console.error("주소 추가에 실패했습니다. 상태:", response.status);
      }
    } catch (error) {
      console.error("데이터 제출 중 오류 발생:", error);
    }
  };

  const handleAddNewAddress = () => {
    setIsAddModalOpen(true);
  };

  const handleCancelAddNewAddress = () => {
    setIsAddModalOpen(false);
  };

  // 주소 삭제 함수
  const handleAddressDelete = async (id: string) => {
    try {
      // 서버에 삭제 요청을 보냄
      const response = await fetch("/api/user", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          addressId: id,
          email: session?.user.email,
        }),
      });

      if (response.status === 200) {
        console.log("주소가 성공적으로 삭제되었습니다!");
        // 삭제된 주소를 제외한 나머지 주소를 유지
        setAllAddress(allAddress.filter((address) => address._id !== id));
      } else {
        console.error("주소 삭제에 실패했습니다. 상태:", response.status);
      }
    } catch (error) {
      console.error("데이터 삭제 중 오류 발생:", error);
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
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isDefaultAddress}
                        onChange={() => setIsDefaultAddress(!isDefaultAddress)}
                        name="isDefaultAddress"
                      />
                    }
                    label="Use default address"
                  />

                  <Button
                    color="primary"
                    variant="outlined"
                    style={{ marginLeft: "1rem" }}
                    onClick={handleAddNewAddress} // Use the same function you have for the "Add New Address" button
                  >
                    Add Address
                  </Button>

                  {/* 모달 부분 */}
                  {isAddModalOpen && (
                    <NewAddressModalWrapper
                      initialValues={{
                        firstname: "",
                        lastname: "",
                        country: countryList[229],
                        address: "",
                        city: "",
                        state: "",
                        postal_code: "",
                        phone: "",
                      }}
                      onSubmit={handleAddressSubmit}
                      onCancel={handleCancelAddNewAddress}
                      isDefault={isDefault} // Pass isDefault to the modal
                      onCheckboxChange={() => setIsDefault(!isDefault)} // Add a callback for checkbox change
                    />
                  )}

                  <Card1 sx={{ mb: 4 }}>
                    <Heading number={3} title="Shipping Address" />
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
