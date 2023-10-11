"use client";

import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TablePagination, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import Container from "@mui/material/Container";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

export default function RequestTable({ data, isServerTable }: any) {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState(""); // 선택한 옵션 추가

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCellClick = (itemId: string) => {
    router.push(`/${isServerTable ? "server" : "mypage"}/${itemId}`);
  };

  const handleCheckboxChange = (itemId: string) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  const getPricePerItem = () => {
    // 선택한 옵션에 따라 가격 계산 로직 구현
    if (selectedOption === "ConsoliDate") {
      return 20; // 한 개당 $20
    } else if (selectedOption === "Repacking") {
      return 30; // 한 개당 $30
    } else {
      return 0; // 선택한 옵션이 없으면 0
    }
  };

  const getTotalPrice = () => {
    // 선택한 항목 수와 가격을 곱하여 총 가격 계산
    const pricePerItem = getPricePerItem();
    return selectedItems.length * pricePerItem;
  };

  const sortedData = Array.isArray(data)
    ? data.slice().sort((a: any, b: any) => {
        const dateA = new Date(a.request_submitted_at).getTime();
        const dateB = new Date(b.request_submitted_at).getTime();
        return dateB - dateA;
      })
    : [];

  const handleAddToCart = async (values: any) => {
    const requestData = {
      add_to_cart: {
        options: selectedOption,
        total_price: getTotalPrice(),
      },
      status: 2,
    };

    try {
      // 선택한 옵션을 각 선택된 항목에 대해 PUT 요청으로 전송
      for (const itemId of selectedItems) {
        const response = await fetch(`/api/request/${itemId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });

        if (response.status === 201) {
          // PUT 요청이 성공하면 추가 작업을 수행하거나 필요하다면 여기에 다른 작업을 추가합니다.
        } else {
          console.error("Error submitting data:", response.status);
        }
      }

      // 모든 선택한 항목을 처리한 후에 페이지로 이동합니다.
      router.push("/cart");
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <Container sx={{ my: "1.5rem" }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography
            fontSize="60px"
            style={{ textAlign: "center", marginBottom: "1.5rem" }}
          >
            My Packages
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            fontSize="20px"
            style={{ textAlign: "center", marginBottom: "5rem" }}
          >
            Select the package(s) you want to request optional packing services
            or pay for shipping.
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item lg={6} xs={12}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Request ID</TableCell>
                  <TableCell>Product Name</TableCell>
                  <TableCell align="right">URL Address</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.isArray(data) && data.length > 0 ? (
                  sortedData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((item: any, rowIndex: number) =>
                      item.request_info.product_list.map(
                        (product: any, index: number) => (
                          <TableRow
                            key={`${item._id}_${index}`}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                            // onClick={() => handleCellClick(item._id)}
                            style={{ cursor: "pointer" }}
                          >
                            {index === 0 && (
                              <TableCell align="left">
                                <Checkbox
                                  checked={selectedItems.includes(item._id)}
                                  onChange={() =>
                                    handleCheckboxChange(item._id)
                                  }
                                />
                                {item.request_id}
                              </TableCell>
                            )}
                            {index !== 0 && (
                              <TableCell align="left"></TableCell>
                            )}
                            <TableCell component="th" scope="row">
                              {product.name}
                            </TableCell>
                            <TableCell align="right">
                              <a
                                href={product.url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {product.url}
                              </a>
                            </TableCell>
                            <TableCell align="right">{product.price}</TableCell>
                          </TableRow>
                        )
                      )
                    )
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No Data
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={sortedData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Grid>

        <Grid item lg={3} sm={6} xs={12}>
          <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
            <Typography fontSize="20px">Optional Services</Typography>
          </div>
          <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleOptionClick("ConsoliDate")}
            >
              ConsoliDate
            </Button>
          </div>
          <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => handleOptionClick("Repacking")}
            >
              Repacking
            </Button>
          </div>
        </Grid>
        <Grid item lg={3} sm={6} xs={12}>
          <Typography fontSize="50px" style={{ textAlign: "center" }}>
            $ {getTotalPrice()}
          </Typography>
          <Typography
            fontSize="20px"
            style={{ textAlign: "center", marginBottom: "2.5rem" }}
          >
            Option Price
          </Typography>
          <Divider
            orientation="horizontal"
            style={{ marginBottom: "2.5rem" }}
          />
          <Typography
            fontSize="20px"
            style={{ textAlign: "center", marginBottom: "1.5rem" }}
          >
            {selectedItems.length > 0 ? selectedOption : "No Selected Option"}
          </Typography>
          <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleAddToCart}
            >
              Add To Cart
            </Button>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}
