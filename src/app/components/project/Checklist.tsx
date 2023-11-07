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
  Pagination, // Pagination 컴포넌트 불러오기
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import Link from "next/link";

const Checklist = ({ data, selectedCart, onCartSelect }: any) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [searchField, setSearchField] = useState("cartID");
  const [searchValue, setSearchValue] = useState("");

  const numPages = Math.ceil(Object.keys(data).length / itemsPerPage);

  const getCurrentPageItems = () => {
    const cartIds = Object.keys(data);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return cartIds.slice(startIndex, endIndex);
  };

  const handlePageClick = (event, page) => {
    setCurrentPage(page);
  };

  const handleSearchFieldChange = (event) => {
    setSearchField(event.target.value);
  };

  const handleSearchValueChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchValue(value);

    const filteredItems = Object.keys(data).filter((cartId) => {
      const cartData = data[cartId][0];
      const status = cartData.status;

      if (status >= 4) {
        if (
          searchField.toLowerCase() === "cartid" &&
          cartId.toLowerCase().includes(value)
        ) {
          return true;
        } else if (
          searchField.toLowerCase() === "options" &&
          cartData.cartOptions.toLowerCase().includes(value)
        ) {
          return true;
        } else if (
          searchField.toLowerCase() === "status" &&
          status.toString().toLowerCase().includes(value)
        ) {
          return true;
        }
      }
      return false;
    });

    // 현재 페이지를 첫 번째 페이지로 설정하고 필터된 결과를 업데이트합니다.
    setCurrentPage(1);
    setCurrentPageItems(filteredItems);
  };

  const [currentPageItems, setCurrentPageItems] = useState(
    getCurrentPageItems()
  );

  return (
    <>
      <TableContainer component={Paper} sx={{ minWidth: 900 }}>
        <FormControl
          variant="outlined"
          style={{ margin: "1rem", width: "100px" }}
        >
          <InputLabel id="search-field-label">Search Field</InputLabel>
          <Select
            labelId="search-field-label"
            id="search-field"
            value={searchField}
            onChange={handleSearchFieldChange}
            label="Search Field"
          >
            <MenuItem value="cartID">Cart ID</MenuItem>
            <MenuItem value="options">Options</MenuItem>
            <MenuItem value="status">Status</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label={`Search ${searchField}`}
          variant="outlined"
          value={searchValue}
          onChange={handleSearchValueChange}
          style={{ margin: "1rem", width: "250px" }}
        />

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
            {currentPageItems.map((cartId) => {
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
          margin: "1rem",
          justifyContent: "center",
        }}
      >
        <Pagination
          count={numPages}
          page={currentPage}
          color="primary"
          onChange={handlePageClick}
        />
      </Stack>
    </>
  );
};

export default Checklist;
