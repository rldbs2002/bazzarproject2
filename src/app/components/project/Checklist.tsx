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
  styled,
  InputBase,
  Card,
} from "@mui/material";
import Link from "next/link";
import { StyledTableCell, StyledTableRow } from "./StyledComponents";

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  height: 44,
  fontSize: 14,
  width: "100%",
  maxWidth: 350,
  fontWeight: 500,
  padding: "0 1rem",
  borderRadius: "8px",
  color: theme.palette.grey[600],
  backgroundColor: theme.palette.grey[200],
  [theme.breakpoints.down("sm")]: { maxWidth: "100%" },
  "::placeholder": { color: theme.palette.text.disabled },
}));

const Checklist = ({ data }: any) => {
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
    <Card sx={{ mb: 4 }}>
      <TableContainer component={Paper} sx={{ minWidth: 900 }}>
        <Select
          value={searchField}
          variant="outlined"
          onChange={handleSearchFieldChange}
          sx={{
            height: 44,
            fontSize: 14,
            width: "100%",
            maxWidth: 100,
            fontWeight: 500,
            borderRadius: "8px",
            margin: "1rem",
          }}
        >
          <MenuItem value="cartID">Cart ID</MenuItem>
          <MenuItem value="options">Options</MenuItem>
          <MenuItem value="status">Status</MenuItem>
        </Select>

        <StyledInputBase
          placeholder="Search..."
          value={searchValue}
          onChange={handleSearchValueChange}
          style={{ width: "250px" }}
        />

        <Table>
          <TableHead sx={{ backgroundColor: "grey.200" }}>
            <TableRow>
              <StyledTableCell>Cart ID</StyledTableCell>
              <StyledTableCell>Options</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentPageItems.map((cartId) => {
              const cartData = data[cartId][0];
              console.log(cartData);
              const status = cartData.status;
              const cart_id = cartData.cart_id;

              if (status >= 4) {
                return (
                  <StyledTableRow key={cartId}>
                    <StyledTableCell align="left" sx={{ fontWeight: 400 }}>
                      <Link href={`/checkout/${cartId}`}>{cart_id}</Link>
                    </StyledTableCell>
                    <StyledTableCell align="left" sx={{ fontWeight: 400 }}>
                      {cartData.cartOptions}
                    </StyledTableCell>
                    <StyledTableCell align="left" sx={{ fontWeight: 400 }}>
                      {status}
                    </StyledTableCell>
                  </StyledTableRow>
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
    </Card>
  );
};

export default Checklist;
