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
  Stack,
  Radio,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination, // MUI Pagination 불러오기
} from "@mui/material";
import Link from "next/link";

const CartListItems = ({ data, selectedCart, onCartSelect }: any) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태 추가
  const [searchCriteria, setSearchCriteria] = useState("cartId"); // "status" 또는 "requestId" 중 하나로 초기화
  const itemsPerPage = 10; // 한 페이지에 보여줄 아이템 수

  const numPages = Math.ceil(Object.keys(data).length / itemsPerPage);

  // 현재 페이지에 해당하는 아이템을 가져오는 함수
  const getCurrentPageItems = () => {
    const cartIds = Object.keys(data);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return cartIds.slice(startIndex, endIndex).filter((cartId) => {
      const cartData = data[cartId][0];
      const status = cartData.status;
      const requestId = data[cartId][0].userRequest.request_id;

      if (status === 2 || status === 3) {
        // status가 2 또는 3인 경우에만 반환
        if (searchCriteria === "status") {
          return status.toString().includes(searchTerm);
        } else if (searchCriteria === "requestId") {
          return requestId.includes(searchTerm);
        } else {
          return cartId.toLowerCase().includes(searchTerm.toLowerCase());
        }
      }
      return false; // status가 2 또는 3이 아닌 경우는 필터링
    });
  };

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", margin: "1.5rem" }}>
        <FormControl sx={{ width: "120px" }}>
          <Select
            value={searchCriteria}
            onChange={(e) => setSearchCriteria(e.target.value)}
          >
            <MenuItem value="cartId">Cart ID</MenuItem>
            <MenuItem value="status">Status</MenuItem>
            <MenuItem value="requestId">Request ID</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            width: "250px",
            margin: "1rem",
          }} // TextField와 간격 조절
        />
      </div>

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
                return status === 2 || status === 3;
              })
              .map((cartId) => {
                const cartData = data[cartId][0];
                const status = cartData.status;

                return (
                  <TableRow key={cartId}>
                    <TableCell>
                      <Radio
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
                    <TableCell>{status}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      {getCurrentPageItems().filter((cartId) => {
        const cartData = data[cartId][0];
        const status = cartData.status;
        return status === 2 || status === 3;
      }).length === 0 && (
        <div style={{ textAlign: "center", margin: "1rem" }}>
          Cart Data is Empty
        </div>
      )}

      <Stack
        direction="row"
        spacing={1}
        sx={{
          marginTop: 2,
          justifyContent: "center",
          margin: "1rem",
        }}
      >
        <Pagination
          count={numPages}
          page={currentPage}
          color="primary"
          onChange={handlePageChange}
        />
      </Stack>
    </>
  );
};

export default CartListItems;
