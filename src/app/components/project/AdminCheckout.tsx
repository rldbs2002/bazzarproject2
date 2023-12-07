"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  styled,
  InputBase,
  Button,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import Link from "next/link";
import { StyledTableCell } from "./StyledComponents";
import { useRouter } from "next/navigation";
import { statusNames } from "@/constants";
import { Paragraph } from "../Typography";

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

const AdminCheckout = ({ data }: any) => {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [searchCriteria, setSearchCriteria] = useState("userId");
  const [filterStatus, setFilterStatus] = useState("5");

  console.log(data);

  // Filter function based on search criteria and status
  const filteredData = Array.isArray(data)
    ? data.filter((item: any) => {
        // Case-insensitive search by user ID or email
        const searchTermLowerCase = searchTerm.toLowerCase();
        const userFieldToSearch =
          searchCriteria === "userId" ? item.user : item.userEmail;
        const isMatchingUser = userFieldToSearch
          .toLowerCase()
          .includes(searchTermLowerCase);

        // Filter by status
        const isMatchingStatus =
          filterStatus === "all" || item.status.toString() === filterStatus;

        return isMatchingUser && isMatchingStatus;
      })
    : [];

  // Handler for status toggle
  const handleStatusToggle = (
    event: React.MouseEvent<HTMLElement>,
    newFilterStatus: string
  ) => {
    setFilterStatus(newFilterStatus);
  };

  return (
    <>
      <Paragraph
        style={{
          fontSize: "1.7rem",
          marginBottom: "1rem",
          fontWeight: "bold",
        }}
      >
        Admin Carts
      </Paragraph>
      <StyledInputBase
        placeholder={`Search by ${
          searchCriteria === "userId" ? "User ID" : "Email"
        }...`}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{
          width: "250px",
          margin: "1rem",
        }}
      />

      {/* Status filters */}
      <ToggleButtonGroup
        value={filterStatus}
        exclusive
        onChange={handleStatusToggle}
        aria-label="Show Items"
        sx={{ margin: "1rem", marginLeft: "auto" }}
      >
        <ToggleButton value="5">Not Yet</ToggleButton>
        <ToggleButton value="6">Processing</ToggleButton>
        <ToggleButton value="7">Done</ToggleButton>
      </ToggleButtonGroup>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "grey.200" }}>
            <TableRow>
              <StyledTableCell>User ID</StyledTableCell>
              <StyledTableCell>Cart ID</StyledTableCell>
              <StyledTableCell>Options</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(filteredData) &&
              filteredData.map((item: any) => (
                <TableRow key={item._id}>
                  <StyledTableCell
                    align="left"
                    sx={{ fontWeight: 400, cursor: "pointer" }}
                  >
                    {item.user}
                  </StyledTableCell>
                  <StyledTableCell
                    align="left"
                    sx={{ fontWeight: 400, cursor: "pointer" }}
                  >
                    <Link href={`/checkout/${item._id}`}>{item.cart_id}</Link>
                  </StyledTableCell>
                  <StyledTableCell
                    align="left"
                    sx={{ fontWeight: 400, cursor: "pointer" }}
                  >
                    {item.options}
                  </StyledTableCell>
                  <StyledTableCell
                    align="left"
                    sx={{ fontWeight: 400, cursor: "pointer" }}
                  >
                    {statusNames[item.status]}
                  </StyledTableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default AdminCheckout;
