"use client";

import React, { useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

import {
  Stack,
  Select,
  MenuItem,
  Pagination,
  styled,
  InputBase,
  Button,
  Box,
} from "@mui/material";
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

const CartListItems = ({ data }: any) => {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCriteria, setSearchCriteria] = useState("cartId");
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const itemsPerPage = 10;
  const numPages = Math.ceil(Object.keys(data).length / itemsPerPage);

  const getCurrentPageItems = () => {
    const cartIds = Object.keys(data);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return cartIds
      .filter((cartId) => {
        const cartData = data[cartId][0];
        const status = cartData.status;
        const requestId = data[cartId][0].userRequest.request_id;

        if (status === 2 || status === 3 || status === 4) {
          if (searchCriteria === "status") {
            return status.toString().includes(searchTerm);
          } else if (searchCriteria === "requestId") {
            return requestId.includes(searchTerm);
          } else {
            return cartId.toLowerCase().includes(searchTerm.toLowerCase());
          }
        }
        return false;
      })
      .sort((a, b) => b.localeCompare(a))
      .slice(startIndex, endIndex);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setCurrentPage(newPage);
  };

  const handleDeleteClick = (cartId: string) => {
    setDeleteTarget(cartId);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    const cartId = deleteTarget;
    // 서버에 DELETE 요청을 보냅니다.
    fetch(`/api/cart/${cartId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          // 삭제 성공 시 다른 로직을 추가할 수 있습니다.
          router.push("/cart");
        } else {
          // 삭제 실패 시 다른 로직을 추가할 수 있습니다.
        }
      })
      .catch((error) => {
        console.error("요청 삭제 중 오류 발생: ", error);
      })
      .finally(() => {
        setDeleteModalOpen(false);
      });
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
  };

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
            height: 44,
            fontSize: 14,
            padding: "0 1rem",
            borderRadius: "8px",
            width: { xs: "100%", sm: 250 },
            mb: { xs: 3, sm: 0 },
            mx: { xs: "auto", sm: 0 },
          }}
        />

        <Table>
          <Thead className="thead-style">
            <Tr>
              <Th>Cart ID</Th>
              <Th>Options</Th>
              <Th>Request ID</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {getCurrentPageItems()
              .filter((cartId) => {
                const cartData = data[cartId][0];
                const status = cartData.status;
                return status === 2 || status === 3 || status === 4;
              })
              .map((cartId) => {
                const cartData = data[cartId][0];
                const status = cartData.status;
                const cart_id = cartData.cart_id;
                console.log(cartData);
                const cartOptions = cartData.cartOptions;

                return (
                  <Tr key={cartId}>
                    <Td
                      align="center"
                      sx={{ fontWeight: 400, cursor: "pointer" }}
                      className="custom-td"
                    >
                      <Link href={`/cart/${cartId}`}>{cart_id}</Link>
                    </Td>
                    <Td
                      align="center"
                      sx={{ fontWeight: 400, cursor: "pointer" }}
                      className="custom-td"
                    >
                      <Link href={`/cart/${cartId}`}>{cartOptions}</Link>
                    </Td>
                    <Td
                      align="center"
                      sx={{ fontWeight: 400, cursor: "pointer" }}
                      className="custom-td"
                    >
                      <Link href={`/cart/${cartId}`}>
                        {data[cartId].map((userRequest: any) => (
                          <div key={userRequest.userRequest._id}>
                            {userRequest.userRequest.request_id}
                          </div>
                        ))}
                      </Link>
                    </Td>
                    <Td
                      align="center"
                      sx={{ fontWeight: 400, cursor: "pointer" }}
                      className="custom-td"
                    >
                      <Link href={`/cart/${cartId}`}>
                        {statusNames[status]}
                      </Link>
                    </Td>
                    <Td
                      align="center"
                      sx={{ fontWeight: 400, cursor: "pointer" }}
                      className="custom-td"
                    >
                      <StyledIconButton>
                        <Delete onClick={() => handleDeleteClick(cartId)} />
                      </StyledIconButton>
                    </Td>
                  </Tr>
                );
              })}

            {/* Delete Confirmation Modal */}
            <Dialog open={isDeleteModalOpen} onClose={handleDeleteCancel}>
              <DialogContent>
                <DialogContentText>
                  Are you sure you want to delete this item?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleDeleteCancel} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleDeleteConfirm} color="primary">
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          </Tbody>
        </Table>

        {getCurrentPageItems().filter((cartId) => {
          const cartData = data[cartId][0];
          const status = cartData.status;
          return status === 2 || status === 3 || status === 4;
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
      </Card1>
    </Box>
  );
};

export default CartListItems;
