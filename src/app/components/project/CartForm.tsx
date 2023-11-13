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
import { FlexBox } from "../flex-box";
import { Modal, Backdrop, Fade } from "@mui/material";
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

// 환율과 날짜를 가져오는 함수

const CartForm: FC = ({ data }: any) => {
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedImageUrl, setSelectedImageUrl] = useState("");

  // 모달을 열기 위한 함수
  const openModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setSelectedImageUrl(imageUrl);
  };

  // 모달을 닫기 위한 함수
  const closeModal = () => {
    setSelectedImage("");
  };

  console.log(data);

  // data를 배열로 변환
  const dataArray = Object.values(data);

  return (
    <>
      <Container maxWidth="md">
        {Object.keys(data).map((cartId, index) => (
          <Card1 key={index} sx={{ mb: 4 }}>
            <Typography
              fontSize="40px"
              style={{ textAlign: "left", marginBottom: "1.5rem" }}
            >
              Request Lists
            </Typography>

            {data[cartId].map((userRequest, userRequestIndex) => (
              <div key={userRequestIndex} style={{ margin: "2rem" }}>
                <Heading
                  number={1}
                  title={`Request ID: #${userRequest.userRequest.request_id}`}
                />
                <Grid container spacing={2}>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      label="Tracking number"
                      variant="outlined"
                      fullWidth
                      value={
                        userRequest.userRequest.request_info.tracking_info
                          .tracking_number
                      }
                      margin="normal"
                    />
                    <TextField
                      label="Carrier"
                      variant="outlined"
                      fullWidth
                      value={
                        userRequest.userRequest.request_info.tracking_info
                          .tracking_carrier
                      }
                      margin="normal"
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      label="Order Number"
                      variant="outlined"
                      fullWidth
                      value={
                        userRequest.userRequest.request_info.tracking_info
                          .order_number
                      }
                      margin="normal"
                    />
                    <TextField
                      label="Merchant / Store"
                      variant="outlined"
                      fullWidth
                      value={
                        userRequest.userRequest.request_info.tracking_info.store
                      }
                      margin="normal"
                      sx={{ mb: 4 }}
                    />
                  </Grid>
                </Grid>

                <Heading number={2} title="Product List" />

                {userRequest.userRequest.request_info.product_list.map(
                  (product, productIndex) => (
                    <div key={productIndex}>
                      <Typography variant="h6">
                        ITEM #{productIndex + 1}
                      </Typography>
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
                            margin="normal"
                          />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                          <TextField
                            label="Price (USD)"
                            variant="outlined"
                            fullWidth
                            value={product.priceUSD}
                            margin="normal"
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
                            value={product.quantity}
                            margin="normal"
                          />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                          <TextField
                            label="Total Value (USD)"
                            variant="outlined"
                            fullWidth
                            value={(
                              Number(product.priceUSD) *
                              Number(product.quantity)
                            ).toFixed(2)}
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
                  )
                )}

                <div style={{ marginTop: "2rem" }}>
                  <Heading number={3} title="Shipping Address" />
                  <Grid container spacing={2}>
                    <Grid item sm={6} xs={12}>
                      <TextField
                        name="firstname"
                        label="First Name"
                        variant="outlined"
                        fullWidth
                        value={
                          userRequest.userRequest.request_info.arrived_info
                            .firstname
                        }
                        margin="normal"
                      />
                      <TextField
                        name="lastname"
                        label="Last Name"
                        variant="outlined"
                        fullWidth
                        value={
                          userRequest.userRequest.request_info.arrived_info
                            .lastname
                        }
                        margin="normal"
                      />

                      <TextField
                        name="address"
                        label="Address"
                        variant="outlined"
                        fullWidth
                        value={
                          userRequest.userRequest.request_info.arrived_info
                            .address
                        }
                        margin="normal"
                      />

                      <TextField
                        label="Country"
                        margin="normal"
                        variant="outlined"
                        fullWidth
                        value={
                          userRequest.userRequest.request_info.arrived_info
                            .country.label
                        }
                      />
                    </Grid>

                    <Grid item sm={6} xs={12}>
                      <TextField
                        name="city"
                        label="City"
                        variant="outlined"
                        fullWidth
                        value={
                          userRequest.userRequest.request_info.arrived_info.city
                        }
                        margin="normal"
                      />
                      <TextField
                        name="state"
                        label="State"
                        variant="outlined"
                        fullWidth
                        value={
                          userRequest.userRequest.request_info.arrived_info
                            .state
                        }
                        margin="normal"
                      />
                      <TextField
                        name="postal_code"
                        label="Postal Code"
                        variant="outlined"
                        fullWidth
                        value={
                          userRequest.userRequest.request_info.arrived_info
                            .postal_code
                        }
                        margin="normal"
                      />
                      <TextField
                        name="phone"
                        label="Phone Number"
                        variant="outlined"
                        fullWidth
                        value={
                          userRequest.userRequest.request_info.arrived_info
                            .phone
                        }
                        margin="normal"
                      />
                    </Grid>
                  </Grid>
                </div>
              </div>
            ))}

            {/* Repacking 정보 */}
            {data[cartId][0].repacking && data[cartId][0].status >= 6 && (
              <div className="m-5" style={{ margin: "2rem" }}>
                <Heading number={4} title={`Repacking Images`} />
                {/* Repacking Images */}
                {data[cartId][0].repacking.repacking_images && (
                  <div>
                    {data[cartId][0].repacking.repacking_images.map(
                      (image, imageIndex) => (
                        <div key={imageIndex}>
                          {/* 클릭 시 모달 열도록 수정 */}
                          <Button onClick={() => openModal(image)}>
                            {image}
                          </Button>
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Shipping 정보 */}
            {data[cartId][0].shipping && data[cartId][0].status >= 7 && (
              <div className="m-5" style={{ margin: "2rem" }}>
                <Heading number={5} title={`Shipping Images`} />
                {/* Shipping Images */}
                {data[cartId][0].shipping.shipping_images && (
                  <div>
                    {data[cartId][0].shipping.shipping_images.map(
                      (image, imageIndex) => (
                        <div key={imageIndex}>
                          {/* 클릭 시 모달 열도록 수정 */}
                          <Button onClick={() => openModal(image)}>
                            {image}
                          </Button>
                        </div>
                      )
                    )}
                  </div>
                )}

                {/* Additional Information */}
                <div style={{ marginTop: "2rem" }}>
                  <Heading number={6} title={`Additional Information`} />
                  <div>
                    <Typography variant="subtitle2">
                      Carrier: {data[cartId][0].shipping.shipping_carrier}
                    </Typography>
                    <Typography variant="subtitle2">
                      Tracking Number:{" "}
                      {data[cartId][0].shipping.shipping_number}
                    </Typography>
                  </div>
                </div>
              </div>
            )}
          </Card1>
        ))}
      </Container>

      {/* MUI Modal 컴포넌트 */}
      <Modal open={!!selectedImage} onClose={closeModal} closeAfterTransition>
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
            <img
              src={selectedImageUrl}
              alt="Selected Image"
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
    </>
  );
};

export default CartForm;
