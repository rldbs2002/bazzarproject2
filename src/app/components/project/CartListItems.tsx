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
  styled,
  InputBase,
} from "@mui/material";
import Link from "next/link";
import {
  StyledTableCell,
  StyledTableRow,
  StyledIconButton,
} from "./StyledComponents";
import { Delete } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

    return cartIds
      .filter((cartId) => {
        const cartData = data[cartId][0];
        const status = cartData.status;
        const requestId = data[cartId][0].userRequest.request_id;

        if (status === 2 || status === 3 || status === 5) {
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
      })
      .sort((a, b) => b.localeCompare(a)) // Sort cartIds in reverse order
      .slice(startIndex, endIndex);
  };

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const [isDeleted, setIsDeleted] = useState(false);

  const handleDeleteClick = () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      // 서버에 DELETE 요청을 보냅니다.
      fetch(`/api/cart/`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            // 삭제 성공 시 Toastify 메시지를 표시하고 페이지를 리로드합니다.
            toast.success("요청이 성공적으로 삭제되었습니다.");
            setIsDeleted(true);
          } else {
            // 삭제 실패
            console.error("요청 삭제에 실패했습니다.");
          }
        })
        .catch((error) => {
          console.error("요청 삭제 중 오류 발생: ", error);
        });
    }
  };

  return (
    <>
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
        }} // TextField와 간격 조절
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "grey.200" }}>
            <TableRow>
              <StyledTableCell>Cart ID</StyledTableCell>
              <StyledTableCell>Request ID</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getCurrentPageItems()
              .filter((cartId) => {
                const cartData = data[cartId][0];
                const status = cartData.status;
                return status === 2 || status === 3 || status === 5;
              })
              .map((cartId) => {
                const cartData = data[cartId][0];
                const status = cartData.status;
                const options = cartData.cartOptions;
                const cart_id = cartData.cart_id;

                return (
                  <TableRow key={cartId}>
                    <StyledTableCell
                      align="left"
                      sx={{ fontWeight: 400, cursor: "pointer" }}
                    >
                      <Link href={`/cart/${cartId}`}>{cart_id}</Link>
                    </StyledTableCell>
                    <StyledTableCell
                      align="left"
                      sx={{ fontWeight: 400, cursor: "pointer" }}
                    >
                      {data[cartId].map((userRequest) => (
                        <div key={userRequest.userRequest._id}>
                          Request ID: {userRequest.userRequest.request_id}
                        </div>
                      ))}
                    </StyledTableCell>
                    <StyledTableCell
                      align="left"
                      sx={{ fontWeight: 400, cursor: "pointer" }}
                    >
                      {status}
                    </StyledTableCell>
                    <StyledTableCell
                      align="left"
                      sx={{ fontWeight: 400, cursor: "pointer" }}
                    >
                      <StyledIconButton>
                        <Delete onClick={handleDeleteClick} />
                      </StyledIconButton>
                    </StyledTableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      {getCurrentPageItems().filter((cartId) => {
        const cartData = data[cartId][0];
        const status = cartData.status;
        return status === 2 || status === 3 || status === 5;
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
