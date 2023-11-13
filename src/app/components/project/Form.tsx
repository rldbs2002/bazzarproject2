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
import { FlexBox, FlexBetween } from "../flex-box";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import Card from "@mui/material/Card";
import { useSession } from "next-auth/react";
import ArrivedUploadButton from "./ArrivedUploadButton";
import { redirect } from "next/navigation";

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

export default function Form({ data }: any) {
  const [currentExchangeRate, setCurrentExchangeRate] = useState(""); // 환율 정보를 저장할 상태 변수
  const [currentDate, setCurrentDate] = useState(""); // 오늘 날짜를 저장할 상태 변수

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/");
    },
  });

  const [formData, setFormData] = useState(data); // data를 초기 데이터로 설정

  const [status, setStatus] = useState(1); // 1은 보기 모드, 2는 편집 모드

  const updateDataOnServer = async (updatedData: any) => {
    try {
      const response = await fetch(`/api/request/${data._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      if (response.ok) {
        console.log("데이터가 성공적으로 업데이트되었습니다.");
        const updatedDataDB = await response.json();
        // 로컬 데이터를 업데이트합니다.
        setFormData(updatedDataDB);
      } else {
        console.error("데이터 업데이트 실패");
      }
    } catch (error) {
      console.error("데이터 업데이트 중 오류 발생:", error);
    }
  };

  return (
    <Grid
      container
      spacing={3}
      style={{ position: "relative", overflowY: "auto" }}
    >
      <Grid item xs={12}>
        <Container maxWidth="md">
          <form>
            <Card1 sx={{ mb: 4 }}>
              <Typography
                fontSize="40px"
                style={{ textAlign: "left", marginBottom: "1.5rem" }}
              >
                New Request
              </Typography>
              <Heading number={1} title="Request Form" />
              <Grid container spacing={2}>
                <Grid item sm={6} xs={12}>
                  <TextField
                    label="Tracking number"
                    variant="outlined"
                    fullWidth
                    value={
                      status === 2
                        ? formData.request_info.tracking_info.tracking_number
                        : data.request_info.tracking_info.tracking_number
                    }
                    margin="normal"
                    disabled={status === 1} // Fields are disabled when status is 1
                    inputProps={{
                      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                        if (status === 2) {
                          setFormData((prevData: any) => ({
                            ...prevData,
                            request_info: {
                              ...prevData.request_info,
                              tracking_info: {
                                ...prevData.request_info.tracking_info,
                                tracking_number: e.target.value,
                              },
                            },
                          }));
                        }
                      },
                    }}
                  />
                  <TextField
                    label="Carrier"
                    variant="outlined"
                    fullWidth
                    disabled={status === 1}
                    value={
                      status === 2
                        ? formData.request_info.tracking_info.tracking_carrier
                        : data.request_info.tracking_info.tracking_carrier
                    }
                    margin="normal"
                    inputProps={{
                      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                        if (status === 2) {
                          setFormData((prevData: any) => ({
                            ...prevData,
                            request_info: {
                              ...prevData.request_info,
                              tracking_info: {
                                ...prevData.request_info.tracking_info,
                                tracking_carrier: e.target.value,
                              },
                            },
                          }));
                        }
                      },
                    }}
                  ></TextField>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <TextField
                    label="Order Number"
                    variant="outlined"
                    fullWidth
                    disabled={status === 1}
                    value={
                      status === 2
                        ? formData.request_info.tracking_info.order_number
                        : data.request_info.tracking_info.order_number
                    }
                    margin="normal"
                    inputProps={{
                      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                        if (status === 2) {
                          setFormData((prevData: any) => ({
                            ...prevData,
                            request_info: {
                              ...prevData.request_info,
                              tracking_info: {
                                ...prevData.request_info.tracking_info,
                                order_number: e.target.value,
                              },
                            },
                          }));
                        }
                      },
                    }}
                  />
                  <TextField
                    label="Merchant / Store"
                    variant="outlined"
                    fullWidth
                    disabled={status === 1}
                    value={
                      status === 2
                        ? formData.request_info.tracking_info.store
                        : data.request_info.tracking_info.store
                    }
                    margin="normal"
                    inputProps={{
                      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                        if (status === 2) {
                          setFormData((prevData: any) => ({
                            ...prevData,
                            request_info: {
                              ...prevData.request_info,
                              tracking_info: {
                                ...prevData.request_info.tracking_info,
                                store: e.target.value,
                              },
                            },
                          }));
                        }
                      },
                    }}
                    sx={{ mb: 4 }}
                  />
                </Grid>
              </Grid>
            </Card1>

            <Card1 sx={{ mb: 4 }}>
              <Heading number={2} title="Product List" />
              {data.request_info.product_list.map(
                (product: any, index: number) => (
                  <div key={index}>
                    <Typography variant="h6">ITEM #{index + 1}</Typography>
                    {index > 0 && (
                      <div>
                        <HighlightOffOutlinedIcon
                          color="primary"
                          sx={{ cursor: "pointer", marginBottom: "2px" }}
                        />
                      </div>
                    )}
                    <Grid container spacing={2}>
                      <Grid item sm={6} xs={12}>
                        <TextField
                          label="Product Name"
                          variant="outlined"
                          fullWidth
                          disabled={status === 1}
                          value={
                            status === 2
                              ? formData.request_info.product_list[index].name
                              : product.name
                          }
                          margin="normal"
                          InputProps={{
                            readOnly: status === 1, // 읽기 전용 모드에서는 readOnly 속성 사용
                          }}
                          inputProps={{
                            onChange: (
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              if (status === 2) {
                                const updatedData = [
                                  ...formData.request_info.product_list,
                                ];
                                updatedData[index] = {
                                  ...updatedData[index],
                                  name: e.target.value,
                                };
                                setFormData((prevData: any) => ({
                                  ...prevData,
                                  request_info: {
                                    ...prevData.request_info,
                                    product_list: updatedData,
                                  },
                                }));
                              }
                            },
                          }}
                        />
                      </Grid>
                      <Grid item sm={6} xs={12}>
                        <TextField
                          label="Product Type"
                          variant="outlined"
                          fullWidth
                          disabled={status === 1}
                          value={
                            status === 2
                              ? formData.request_info.product_list[index].type
                              : product.type
                          }
                          margin="normal"
                          InputProps={{
                            readOnly: status === 1, // 읽기 전용 모드에서는 readOnly 속성 사용
                          }}
                          inputProps={{
                            onChange: (
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              if (status === 2) {
                                const updatedData = [
                                  ...formData.request_info.product_list,
                                ];
                                updatedData[index] = {
                                  ...updatedData[index],
                                  type: e.target.value,
                                };
                                setFormData((prevData: any) => ({
                                  ...prevData,
                                  request_info: {
                                    ...prevData.request_info,
                                    product_list: updatedData,
                                  },
                                }));
                              }
                            },
                          }}
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
                          disabled={status === 1}
                          value={
                            status === 2
                              ? formData.request_info.product_list[index]
                                  .priceKRW
                              : product.priceKRW
                          }
                          InputProps={{
                            readOnly: status === 1, // 읽기 전용 모드에서는 readOnly 속성 사용
                          }}
                          inputProps={{
                            onChange: (
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              if (status === 2) {
                                const updatedData = [
                                  ...formData.request_info.product_list,
                                ];
                                updatedData[index] = {
                                  ...updatedData[index],
                                  priceKRW: e.target.value,
                                };
                                setFormData((prevData: any) => ({
                                  ...prevData,
                                  request_info: {
                                    ...prevData.request_info,
                                    product_list: updatedData,
                                  },
                                }));
                              }
                            },
                          }}
                          margin="normal"
                        />
                      </Grid>
                      <Grid item sm={6} xs={12}>
                        <TextField
                          label="Price (USD)"
                          variant="outlined"
                          disabled={status === 1}
                          fullWidth
                          value={
                            status === 2
                              ? formData.request_info.product_list[index]
                                  .priceUSD
                              : product.priceUSD
                          }
                          InputProps={{
                            readOnly: status === 1, // 읽기 전용 모드에서는 readOnly 속성 사용
                          }}
                          inputProps={{
                            onChange: (
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              if (status === 2) {
                                const updatedData = [
                                  ...formData.request_info.product_list,
                                ];
                                updatedData[index] = {
                                  ...updatedData[index],
                                  priceUSD: e.target.value,
                                };
                                setFormData((prevData: any) => ({
                                  ...prevData,
                                  request_info: {
                                    ...prevData.request_info,
                                    product_list: updatedData,
                                  },
                                }));
                              }
                            },
                          }}
                          margin="normal"
                        />
                      </Grid>
                    </Grid>
                    <Typography variant="subtitle1">
                      1 KRW = {currentExchangeRate} USD
                    </Typography>
                    <Typography variant="caption">{currentDate}</Typography>
                    <Grid container spacing={2}>
                      <Grid item sm={6} xs={12}>
                        <TextField
                          label="Product Quantity"
                          type="number"
                          variant="outlined"
                          disabled={status === 1}
                          fullWidth
                          value={
                            status === 2
                              ? formData.request_info.product_list[index]
                                  .quantity
                              : product.quantity
                          }
                          InputProps={{
                            readOnly: status === 1, // 읽기 전용 모드에서는 readOnly 속성 사용
                          }}
                          inputProps={{
                            onChange: (
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              if (status === 2) {
                                const updatedData = [
                                  ...formData.request_info.product_list,
                                ];
                                updatedData[index] = {
                                  ...updatedData[index],
                                  quantity: e.target.value,
                                };
                                setFormData((prevData: any) => ({
                                  ...prevData,
                                  request_info: {
                                    ...prevData.request_info,
                                    product_list: updatedData,
                                  },
                                }));
                              }
                            },
                          }}
                          margin="normal"
                        />
                      </Grid>
                      <Grid item sm={6} xs={12}>
                        <TextField
                          label="Total Value (USD)"
                          variant="outlined"
                          disabled={status === 1}
                          fullWidth
                          value={
                            status === 2
                              ? formData.request_info.product_list[index]
                                  .totalValueUSD
                              : product.totalValueUSD
                          }
                          InputProps={{
                            readOnly: status === 1, // 읽기 전용 모드에서는 readOnly 속성 사용
                          }}
                          inputProps={{
                            onChange: (
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              if (status === 2) {
                                const updatedData = [
                                  ...formData.request_info.product_list,
                                ];
                                updatedData[index] = {
                                  ...updatedData[index],
                                  totalValueUSD: e.target.value,
                                };
                                setFormData((prevData: any) => ({
                                  ...prevData,
                                  request_info: {
                                    ...prevData.request_info,
                                    product_list: updatedData,
                                  },
                                }));
                              }
                            },
                          }}
                          margin="normal"
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          label="Product URL"
                          variant="outlined"
                          disabled={status === 1}
                          fullWidth
                          value={
                            status === 2
                              ? formData.request_info.product_list[index].url
                              : product.url
                          }
                          InputProps={{
                            readOnly: status === 1, // 읽기 전용 모드에서는 readOnly 속성 사용
                          }}
                          inputProps={{
                            onChange: (
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              if (status === 2) {
                                const updatedData = [
                                  ...formData.request_info.product_list,
                                ];
                                updatedData[index] = {
                                  ...updatedData[index],
                                  url: e.target.value,
                                };
                                setFormData((prevData: any) => ({
                                  ...prevData,
                                  request_info: {
                                    ...prevData.request_info,
                                    product_list: updatedData,
                                  },
                                }));
                              }
                            },
                          }}
                          margin="normal"
                        />
                      </Grid>
                    </Grid>
                  </div>
                )
              )}
            </Card1>

            {data.status >= 5 && (
              <Card1 sx={{ mb: 4 }}>
                <Heading number={4} title="Arrived Items" />
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <div
                      style={{
                        display: "flex",
                        overflowX: "auto", // 가로 스크롤을 만듭니다.
                        whiteSpace: "nowrap", // 이미지가 옆으로 이어지게 합니다.
                      }}
                    >
                      {data.arrived.arrived_images.map(
                        (image: string, index: number) => (
                          <div
                            key={index}
                            style={{
                              marginRight: "8px",
                              marginBottom: "8px",
                              minWidth: "33.33%",
                            }}
                          >
                            <img
                              src={image}
                              alt={`Arrived Image ${index}`}
                              style={{
                                width: "100%", // 이미지의 가로 크기를 100%로 설정
                                height: "auto", // 높이를 자동으로 조절하여 비율 유지
                              }}
                            />
                          </div>
                        )
                      )}
                    </div>
                  </Grid>
                </Grid>
              </Card1>
            )}

            <Grid container spacing={2}>
              <Grid item xs={6}>
                {status === 1 ? (
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => setStatus(2)}
                    fullWidth
                  >
                    Edit
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => {
                      setStatus(1); // 뷰 모드로 변경
                      setFormData(data); // 이전 데이터로 복원
                    }}
                    fullWidth
                  >
                    Cancel
                  </Button>
                )}
              </Grid>
              <Grid item xs={6}>
                {status === 1 ? (
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                      // formData를 서버로 업데이트
                      updateDataOnServer(formData);

                      // 저장 후 상태를 보기 모드(1)로 변경
                      setStatus(1);
                    }}
                    fullWidth
                  >
                    Submit
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                      setFormData(formData); // 여기서 updatedData는 수정된 formData입니다.
                      setStatus(1); // 뷰 모드로 변경
                    }}
                    fullWidth
                  >
                    Save
                  </Button>
                )}
              </Grid>
            </Grid>
          </form>

          <Grid item xs={12}>
            <Card sx={{ padding: 3 }}>
              {session?.user.role === "admin" && (
                // 여기에서 'admin' 역할 사용자에게만 표시할 내용 추가
                <>
                  <ArrivedUploadButton data={data} />
                </>
              )}
            </Card>
          </Grid>
        </Container>
      </Grid>
    </Grid>
  );
}
