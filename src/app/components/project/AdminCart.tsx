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

const AdminCart = ({ data }: any) => {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCriteria, setSearchCriteria] = useState("cartId");

  console.log(data);

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
        placeholder="Search by User ID..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{
          width: "250px",
          margin: "1rem",
        }}
      />

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
            {Array.isArray(data) &&
              data.map((item: any) => (
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
                    <Link href={`/cart/${item._id}`}>{item.cart_id}</Link>
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

export default AdminCart;
