import React, { FC } from "react";
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
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import { useRouter } from "next/navigation";
import Repacking from "../components/project/Repacking";

async function getData() {
  const res = await fetch("http://localhost:3000/api/repacking", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

const page = async () => {
  const data = await getData();
  console.log(data);

  // const handleAddToCart = async () => {
  //   // 모든 선택한 항목을 requestData 배열에 저장
  //   const requestData = selectedItems.map((itemId) => ({
  //     add_to_cart: {
  //       options: selectedOption,
  //     },
  //     userRequest: itemId, // 각 요청의 _id
  //     status: 2,
  //   }));

  //   try {
  //     const cartResponse = await fetch("/api/cart", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(requestData),
  //     });

  //     if (cartResponse.status === 200) {
  //       // 장바구니에 항목을 추가한 성공적인 응답을 처리합니다.
  //       router.push("/cart");
  //     } else {
  //       console.error("Error submitting data to cart:", cartResponse.status);
  //     }
  //   } catch (error) {
  //     console.error("Error submitting data:", error);
  //   }
  // };

  return <Repacking data={data} />;
};

export default page;
