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
import countryList from "@/app/data/countryList";
import * as yup from "yup";
import { Formik, FieldArray } from "formik";
import Autocomplete from "@mui/material/Autocomplete";
import { FlexBox } from "../flex-box";
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

  useEffect(() => {
    // 컴포넌트가 마운트될 때 환율 정보와 오늘 날짜를 가져옴
    const fetchData = async () => {
      const { exchangeRate, currentDate } = await getExchangeRateAndDate();
      setCurrentExchangeRate(exchangeRate);
      setCurrentDate(currentDate);
    };

    fetchData();
  }, []); // 빈 배열을 전달하여 한 번만 실행되도록 설정

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
      <Grid item sm={8} xs={12}>
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
                      onChange: (e) => {
                        if (status === 2) {
                          setFormData((prevData) => ({
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
                      onChange: (e) => {
                        if (status === 2) {
                          setFormData((prevData) => ({
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
                      onChange: (e) => {
                        if (status === 2) {
                          setFormData((prevData) => ({
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
                      onChange: (e) => {
                        if (status === 2) {
                          setFormData((prevData) => ({
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
              {data.request_info.product_list.map((product, index) => (
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
                          onChange: (e) => {
                            if (status === 2) {
                              const updatedData = [
                                ...formData.request_info.product_list,
                              ];
                              updatedData[index] = {
                                ...updatedData[index],
                                name: e.target.value,
                              };
                              setFormData((prevData) => ({
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
                          onChange: (e) => {
                            if (status === 2) {
                              const updatedData = [
                                ...formData.request_info.product_list,
                              ];
                              updatedData[index] = {
                                ...updatedData[index],
                                type: e.target.value,
                              };
                              setFormData((prevData) => ({
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
                            ? formData.request_info.product_list[index].priceKRW
                            : product.priceKRW
                        }
                        InputProps={{
                          readOnly: status === 1, // 읽기 전용 모드에서는 readOnly 속성 사용
                        }}
                        inputProps={{
                          onChange: (e) => {
                            if (status === 2) {
                              const updatedData = [
                                ...formData.request_info.product_list,
                              ];
                              updatedData[index] = {
                                ...updatedData[index],
                                priceKRW: e.target.value,
                              };
                              setFormData((prevData) => ({
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
                            ? formData.request_info.product_list[index].priceUSD
                            : product.priceUSD
                        }
                        InputProps={{
                          readOnly: status === 1, // 읽기 전용 모드에서는 readOnly 속성 사용
                        }}
                        inputProps={{
                          onChange: (e) => {
                            if (status === 2) {
                              const updatedData = [
                                ...formData.request_info.product_list,
                              ];
                              updatedData[index] = {
                                ...updatedData[index],
                                priceUSD: e.target.value,
                              };
                              setFormData((prevData) => ({
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
                            ? formData.request_info.product_list[index].quantity
                            : product.quantity
                        }
                        InputProps={{
                          readOnly: status === 1, // 읽기 전용 모드에서는 readOnly 속성 사용
                        }}
                        inputProps={{
                          onChange: (e) => {
                            if (status === 2) {
                              const updatedData = [
                                ...formData.request_info.product_list,
                              ];
                              updatedData[index] = {
                                ...updatedData[index],
                                quantity: e.target.value,
                              };
                              setFormData((prevData) => ({
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
                          onChange: (e) => {
                            if (status === 2) {
                              const updatedData = [
                                ...formData.request_info.product_list,
                              ];
                              updatedData[index] = {
                                ...updatedData[index],
                                totalValueUSD: e.target.value,
                              };
                              setFormData((prevData) => ({
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
                          onChange: (e) => {
                            if (status === 2) {
                              const updatedData = [
                                ...formData.request_info.product_list,
                              ];
                              updatedData[index] = {
                                ...updatedData[index],
                                url: e.target.value,
                              };
                              setFormData((prevData) => ({
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
              ))}
            </Card1>

            <Card1 sx={{ mb: 4 }}>
              <Heading number={3} title="Shipping Address" />
              <Grid container spacing={2}>
                <Grid item sm={6} xs={12}>
                  <TextField
                    label="First Name"
                    variant="outlined"
                    disabled={status === 1}
                    fullWidth
                    value={
                      status === 2
                        ? formData.request_info.arrived_info.firstname
                        : data.request_info.arrived_info.firstname
                    }
                    margin="normal"
                    InputProps={{
                      readOnly: status === 1,
                    }}
                    inputProps={{
                      onChange: (e) => {
                        if (status === 2) {
                          setFormData((prevData) => ({
                            ...prevData,
                            request_info: {
                              ...prevData.request_info,
                              arrived_info: {
                                ...prevData.request_info.arrived_info,
                                firstname: e.target.value,
                              },
                            },
                          }));
                        }
                      },
                    }}
                  />
                  <TextField
                    label="Last Name"
                    variant="outlined"
                    disabled={status === 1}
                    fullWidth
                    value={
                      status === 2
                        ? formData.request_info.arrived_info.lastname
                        : data.request_info.arrived_info.lastname
                    }
                    InputProps={{
                      readOnly: status === 1,
                    }}
                    inputProps={{
                      onChange: (e) => {
                        if (status === 2) {
                          setFormData((prevData) => ({
                            ...prevData,
                            request_info: {
                              ...prevData.request_info,
                              arrived_info: {
                                ...prevData.request_info.arrived_info,
                                lastname: e.target.value,
                              },
                            },
                          }));
                        }
                      },
                    }}
                    margin="normal"
                  />

                  <TextField
                    label="Address"
                    variant="outlined"
                    disabled={status === 1}
                    fullWidth
                    value={
                      status === 2
                        ? formData.request_info.arrived_info.address
                        : data.request_info.arrived_info.address
                    }
                    InputProps={{
                      readOnly: status === 1,
                    }}
                    inputProps={{
                      onChange: (e) => {
                        if (status === 2) {
                          setFormData((prevData) => ({
                            ...prevData,
                            request_info: {
                              ...prevData.request_info,
                              arrived_info: {
                                ...prevData.request_info.arrived_info,
                                address: e.target.value,
                              },
                            },
                          }));
                        }
                      },
                    }}
                    margin="normal"
                  />

                  <TextField
                    label="country"
                    fullWidth
                    margin="normal"
                    disabled={status === 1}
                    value={
                      status === 2
                        ? formData.request_info.arrived_info.country.label
                        : data.request_info.arrived_info.country.label
                    }
                    InputProps={{
                      readOnly: status === 1,
                    }}
                    inputProps={{
                      onChange: (e) => {
                        if (status === 2) {
                          setFormData((prevData) => ({
                            ...prevData,
                            request_info: {
                              ...prevData.request_info,
                              arrived_info: {
                                ...prevData.request_info.arrived_info,
                                country: e.target.value,
                              },
                            },
                          }));
                        }
                      },
                    }}
                  />
                </Grid>

                <Grid item sm={6} xs={12}>
                  <TextField
                    label="City"
                    variant="outlined"
                    disabled={status === 1}
                    fullWidth
                    value={
                      status === 2
                        ? formData.request_info.arrived_info.city
                        : data.request_info.arrived_info.city
                    }
                    InputProps={{
                      readOnly: status === 1,
                    }}
                    inputProps={{
                      onChange: (e) => {
                        if (status === 2) {
                          setFormData((prevData) => ({
                            ...prevData,
                            request_info: {
                              ...prevData.request_info,
                              arrived_info: {
                                ...prevData.request_info.arrived_info,
                                city: e.target.value,
                              },
                            },
                          }));
                        }
                      },
                    }}
                    margin="normal"
                  />
                  <TextField
                    label="State"
                    variant="outlined"
                    disabled={status === 1}
                    fullWidth
                    value={
                      status === 2
                        ? formData.request_info.arrived_info.state
                        : data.request_info.arrived_info.state
                    }
                    InputProps={{
                      readOnly: status === 1,
                    }}
                    inputProps={{
                      onChange: (e) => {
                        if (status === 2) {
                          setFormData((prevData) => ({
                            ...prevData,
                            request_info: {
                              ...prevData.request_info,
                              arrived_info: {
                                ...prevData.request_info.arrived_info,
                                state: e.target.value,
                              },
                            },
                          }));
                        }
                      },
                    }}
                    margin="normal"
                  />
                  <TextField
                    label="Postal Code"
                    variant="outlined"
                    disabled={status === 1}
                    fullWidth
                    value={
                      status === 2
                        ? formData.request_info.arrived_info.postal_code
                        : data.request_info.arrived_info.postal_code
                    }
                    InputProps={{
                      readOnly: status === 1,
                    }}
                    inputProps={{
                      onChange: (e) => {
                        if (status === 2) {
                          setFormData((prevData) => ({
                            ...prevData,
                            request_info: {
                              ...prevData.request_info,
                              arrived_info: {
                                ...prevData.request_info.arrived_info,
                                postal_code: e.target.value,
                              },
                            },
                          }));
                        }
                      },
                    }}
                    margin="normal"
                  />
                  <TextField
                    label="Phone Number"
                    variant="outlined"
                    disabled={status === 1}
                    fullWidth
                    value={
                      status === 2
                        ? formData.request_info.arrived_info.phone
                        : data.request_info.arrived_info.phone
                    }
                    margin="normal"
                    InputProps={{
                      readOnly: status === 1,
                    }}
                    inputProps={{
                      onChange: (e) => {
                        if (status === 2) {
                          setFormData((prevData) => ({
                            ...prevData,
                            request_info: {
                              ...prevData.request_info,
                              arrived_info: {
                                ...prevData.request_info.arrived_info,
                                phone: e.target.value,
                              },
                            },
                          }));
                        }
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </Card1>

            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Button variant="outlined" color="primary" fullWidth>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Container>
      </Grid>

      <Grid item sm={4} xs={12}>
        <Card1
          sx={{ mb: 4 }}
          style={{ position: "sticky", padding: "16px", top: "0" }}
        >
          <Grid container spacing={5}>
            <Grid item sm={6} xs={12}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setStatus(2)}
                fullWidth
              >
                Edit
              </Button>
            </Grid>
            <Grid item sm={6} xs={12}>
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
                Save
              </Button>
            </Grid>
            <Grid item sm={6} xs={12}>
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
            </Grid>
          </Grid>
        </Card1>
      </Grid>
    </Grid>
  );
}
