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
} from "@mui/material";
import Card1 from "@/app/components/Card1";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { useSession } from "next-auth/react";
import { Product } from "../../../../type";
import { getShippingData } from "@/app/lib/data";
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

const Shipping = ({ userdata }: any) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getShippingData();

        setData(result);
      } catch (error: any) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  // Add a state variable to track whether the form is being submitted
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleFormSubmit = async () => {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    const cartRequestData = {
      status: 3,
      options: "shipping",
      user: session?.user.email,
      items: data.map((item: any) => ({
        userRequest: item._id,
      })),
    };

    try {
      const cartResponse = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartRequestData),
      });

      if (cartResponse.status === 200) {
        router.push("/cart");
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
              Shipping
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
            <Button onClick={handleFormSubmit} variant="outlined">
              Add to Cart
            </Button>
          </Container>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Container maxWidth="md"></Container>
        </Grid>
      </Grid>
    </>
  );
};

export default Shipping;
