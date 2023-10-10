"use client";

import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TablePagination } from "@mui/material";
import { useRouter } from "next/navigation";
import useMediaQuery from "@mui/material/useMediaQuery";
import Container from "@mui/material/Container";

export default function RequestTable({ data, isServerTable }: any) {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const isMobile = useMediaQuery("(max-width: 600px)");

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

  const sortedData = data.slice().sort((a: any, b: any) => {
    const dateA = new Date(a.request_submitted_at).getTime();
    const dateB = new Date(b.request_submitted_at).getTime();
    return dateB - dateA;
  });

  return (
    <Container maxWidth="xl">
      <div>
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: isMobile ? 320 : 650 }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Request ID</TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell align="right">URL Address</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Shipping Fee</TableCell>
                <TableCell align="right">Message</TableCell>
                <TableCell align="right">Calculated Price</TableCell>
                <TableCell align="right">Confirm</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item: any, rowIndex: number) =>
                  item.request_info.product_list.map(
                    (product: any, index: number) => (
                      <TableRow
                        key={`${item._id}_${index}`}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                        onClick={() => handleCellClick(item._id)}
                        style={{ cursor: "pointer" }}
                      >
                        {index === 0 && (
                          <TableCell align="left">{item.request_id}</TableCell>
                        )}
                        {index !== 0 && <TableCell align="left"></TableCell>}
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
                        <TableCell align="right">
                          {product.shipping_fee}
                        </TableCell>
                        <TableCell align="right">
                          {item.request_info.delivery_request}
                        </TableCell>
                        <TableCell align="right">
                          {item.price_calculate
                            ? item.price_calculate.total_price
                            : "처리중..."}
                        </TableCell>
                        <TableCell align="right">
                          {item.user_confirm ? "처리완료✅" : "처리중..."}
                        </TableCell>
                      </TableRow>
                    )
                  )
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
      </div>
    </Container>
  );
}
