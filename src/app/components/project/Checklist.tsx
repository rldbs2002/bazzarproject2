"use client";

import React, { useState, useEffect } from "react";
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
  Button,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import Link from "next/link";
import {
  StyledTableCell,
  StyledTableRow,
  StyledIconButton,
} from "./StyledComponents";
import { statusNames } from "@/constants";

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
  const [alignment, setAlignment] = useState("process"); // 기본값은 'process'로 설정

  const handleAlignmentChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);

    // Reset search and current page when changing the alignment
    setSearchValue("");
    setCurrentPage(1);
  };

  // Use useEffect to re-render when alignment changes
  useEffect(() => {
    // Update the current page items based on the new alignment
    setCurrentPageItems(getCurrentPageItems());
  }, [alignment]);

  const numPages = Math.ceil(Object.keys(data).length / itemsPerPage);

  const getCurrentPageItems = () => {
    const cartIds = Object.keys(data);
    console.log(cartIds);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return cartIds
      .sort((a, b) => b.localeCompare(a)) // Sort cartIds in reverse order
      .slice(startIndex, endIndex);
  };

  const handlePageClick = (event, page) => {
    setCurrentPage(page);
  };

  const handleSearchFieldChange = (event) => {
    setSearchField(event.target.value.toLowerCase()); // 소문자로 변경
  };

  const handleSearchValueChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchValue(value);

    const filteredItems = Object.keys(data).filter((cartId) => {
      const cartData = data[cartId][0];
      const status = cartData.status;

      if (status >= 4) {
        if (
          searchField.toLowerCase() === "cartID" && // 변경: "cartID"를 "cart_id"로 수정
          cartData.cart_id.toLowerCase().includes(value)
        ) {
          return true;
        } else if (
          // "status" 삭제
          searchField.toLowerCase() === "options" &&
          cartData.cartOptions.toLowerCase().includes(value)
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
        <div style={{ display: "flex", alignItems: "center" }}>
          <Select
            value={searchField.toLowerCase()} // 소문자로 설정
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
            <MenuItem value="cartid">Cart ID</MenuItem>
            <MenuItem value="options">Options</MenuItem>
          </Select>

          <StyledInputBase
            placeholder="Search..."
            value={searchValue}
            onChange={handleSearchValueChange}
            style={{ width: "250px", marginRight: "1rem" }}
          />

          {/* ToggleButtonGroup으로 process과 complete 버튼을 표시합니다. */}
          <ToggleButtonGroup
            value={alignment}
            exclusive
            onChange={handleAlignmentChange}
            aria-label="Show Items"
            sx={{ margin: "1rem", marginLeft: "auto" }}
          >
            <ToggleButton value="process">process</ToggleButton>
            <ToggleButton value="complete">complete</ToggleButton>
          </ToggleButtonGroup>
        </div>

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
              const status = cartData.status;
              const cart_id = cartData.cart_id;

              // Check the alignment value and show items accordingly
              if (
                (!alignment && cartData.status >= 5) ||
                (alignment === "complete" && status > 6) ||
                (alignment === "process" && (status === 5 || status === 6))
              ) {
                return (
                  <StyledTableRow key={cartId}>
                    <StyledTableCell align="left" sx={{ fontWeight: 400 }}>
                      <Link href={`/checkout/${cartId}`}>{cart_id}</Link>
                    </StyledTableCell>
                    <StyledTableCell align="left" sx={{ fontWeight: 400 }}>
                      {cartData.cartOptions}
                    </StyledTableCell>
                    <StyledTableCell align="left" sx={{ fontWeight: 400 }}>
                      {statusNames[status]}
                    </StyledTableCell>
                  </StyledTableRow>
                );
              }
              return null; // Don't render if conditions are not met
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
