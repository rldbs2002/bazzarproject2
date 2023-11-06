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

const Checklist = ({ data, selectedCart, onCartSelect }: any) => {
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
              <TableCell>Cart ID</TableCell>
              <TableCell>Options</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getCurrentPageItems().map((cartId) => {
              const cartData = data[cartId][0];
              const status = cartData.status;

              if (status >= 4) {
                return (
                  <TableRow key={cartId}>
                    <TableCell>
                      <Link href={`/checkout/${cartId}`}>{cartId}</Link>
                    </TableCell>
                    <TableCell>{cartData.cartOptions}</TableCell>
                    <TableCell>$ {cartData.cart_total_price}</TableCell>
                    <TableCell>{status}</TableCell>
                  </TableRow>
                );
              }
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

export default Checklist;
