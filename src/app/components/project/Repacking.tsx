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
import { useSession } from "next-auth/react";
import { Product } from "../../../../type";
import { getConsolidateData, getRepackingData } from "@/app/lib/data";
import { Paragraph } from "../Typography";
import Image from "next/image";
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

const Repacking = ({ userdata }: any) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [data, setData] = useState([]);

  const [selectedImage, setSelectedImage] = useState("");
  const [selectedImageUrl, setSelectedImageUrl] = useState("");

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

  const handleFormSubmit = async () => {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    const cartRequestData = {
      status: 3,
      options: "repacking",
      user: session?.user.email,
      items: data.map((item: any) => ({
        userRequest: item._id,
      })),
    };

    const userRequestData = {
      status: 4,
      requestId: data[0]._id,
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
        const userResponse = await fetch(`/api/repackings`, {
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

  // 모달을 열기 위한 함수
  const openModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setSelectedImageUrl(imageUrl);
  };

  // 모달을 닫기 위한 함수
  const closeModal = () => {
    setSelectedImage("");
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

                <div
                  style={{
                    marginTop: "2rem",
                    border: "1px solid #ccc",
                    padding: "1rem",
                  }}
                >
                  <Heading number={3} title={`Arrived Images`} />

                  {item.arrived.arrived_images.length > 0 ? (
                    // If there are arrived_images
                    item.arrived.arrived_images.map(
                      (image: any, imageIndex: number) => (
                        <div key={imageIndex}>
                          {/* 클릭 시 모달 열도록 수정 */}
                          <Button onClick={() => openModal(image)}>
                            {image}
                          </Button>
                        </div>
                      )
                    )
                  ) : (
                    // If there are no arrived_images
                    <Typography variant="body2">Empty list</Typography>
                  )}
                </div>
              </Card1>
            ))}
            <Button onClick={handleFormSubmit} variant="outlined">
              Add to Cart
            </Button>
          </Container>

          {/* MUI Modal 컴포넌트 */}
          <Modal
            open={!!selectedImage}
            onClose={closeModal}
            closeAfterTransition
          >
            <Fade in={!!selectedImage}>
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  maxWidth: "80vw",
                  maxHeight: "80vh",
                  overflow: "auto",
                }}
              >
                <Image
                  src={selectedImageUrl}
                  alt="Selected Image"
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "auto" }}
                />
                <HighlightOffOutlinedIcon
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    cursor: "pointer",
                  }}
                  onClick={closeModal}
                />
              </div>
            </Fade>
          </Modal>
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

export default Repacking;
