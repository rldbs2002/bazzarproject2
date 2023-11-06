"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Stack,
  Radio, // Radio 컴포넌트 불러오기
} from "@mui/material";
import Link from "next/link";

const CartListItems = ({ data, selectedCart, onCartSelect }: any) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // 한 페이지에 보여줄 아이템 수

  const numPages = Math.ceil(Object.keys(data).length / itemsPerPage);

  // 현재 페이지에 해당하는 아이템을 가져오는 함수
  const getCurrentPageItems = () => {
    const cartIds = Object.keys(data);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return cartIds.slice(startIndex, endIndex);
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Select</TableCell>
              <TableCell>Cart ID</TableCell>
              <TableCell>Request ID</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getCurrentPageItems()
              .filter((cartId) => {
                const cartData = data[cartId][0];
                const status = cartData.status;
                return status !== 4; //status가 4인 항목을 걸러냅니다.
              })
              .map((cartId) => {
                const cartData = data[cartId][0];
                const status = cartData.status;
                const isAdminOrStatus2Or3 = status === 2 || status === 3;

                return (
                  <TableRow key={cartId}>
                    <TableCell>
                      <Radio // Radio 컴포넌트 사용
                        name="selectedCart"
                        checked={selectedCart === cartId}
                        onChange={() => onCartSelect(cartId)}
                      />
                    </TableCell>
                    <Link href={`/cart/${cartId}`}>{cartId}</Link>
                    <TableCell>
                      {data[cartId].map((userRequest) => (
                        <div key={userRequest.userRequest._id}>
                          Request ID: {userRequest.userRequest.request_id}
                        </div>
                      ))}
                    </TableCell>
                    <TableCell>{isAdminOrStatus2Or3 ? status : ""}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack
        direction="row"
        spacing={1}
        sx={{
          marginTop: 2,
          justifyContent: "center",
        }}
      >
        {Array.from({ length: numPages }).map((_, index) => (
          <Button
            key={index}
            variant="outlined"
            color={currentPage === index + 1 ? "primary" : "default"}
            onClick={() => handlePageClick(index + 1)}
          >
            {index + 1}
          </Button>
        ))}
      </Stack>
    </>
  );
};

export default CartListItems;
