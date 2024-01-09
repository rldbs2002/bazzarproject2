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
  Select,
  MenuItem,
  Pagination, // MUI Pagination 불러오기
  styled,
  InputBase,
  Button,
  Box,
} from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import Link from "next/link";
import { StyledTableCell, StyledIconButton } from "./StyledComponents";
import { Delete } from "@mui/icons-material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { useRouter } from "next/navigation";
import { statusNames } from "@/constants";
import { Paragraph } from "../Typography";
import Card1 from "../Card1";

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

const CartListItems2 = ({ data }: any) => {
  const router = useRouter();

  const columns = [
    { field: "cartId", headerName: "Cart ID", width: 150 },
    { field: "options", headerName: "Options", width: 120 },
    { field: "requestId", headerName: "Request ID", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
  ];

  let rows = [];

  if (data && Object.keys(data).length > 0) {
    rows = Object.values(data).map((itemArray, index) => {
      // itemArray는 배열이고, 우리는 첫 번째 요소에 관심이 있습니다.
      const item = itemArray[0];

      return {
        id: index,
        cartId: item.cart_id,
        options: item.cartOptions,
        requestId: item.userRequest?.request_id, // 안전한 접근을 위해 옵셔널 체이닝 사용
        status: item.status,
        // ... 다른 데이터 매핑
      };
    });
  }

  const [searchTerm, setSearchTerm] = useState("");
  const [searchCriteria, setSearchCriteria] = useState("cartId");

  return (
    <Box py={4}>
      <Card1 sx={{ mb: 4 }}>
        <Paragraph
          style={{
            margin: "2rem",
            fontWeight: "bold",
            fontSize: "2rem",
          }}
        >
          Cart
        </Paragraph>
        <Select
          value={searchCriteria}
          onChange={(e) => setSearchCriteria(e.target.value)}
          sx={{
            height: 44,
            fontSize: 14,
            width: "100%",
            maxWidth: 120,
            fontWeight: 500,
            borderRadius: "8px",
            margin: "1rem",
          }}
          variant="outlined"
        >
          <MenuItem value="cartId">Cart ID</MenuItem>
          <MenuItem value="status">Status</MenuItem>
          <MenuItem value="requestId">Request ID</MenuItem>
        </Select>

        <StyledInputBase
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            width: "250px",
          }}
        />

        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            pagination
          />
        </Box>
      </Card1>
    </Box>
  );
};

export default CartListItems2;
