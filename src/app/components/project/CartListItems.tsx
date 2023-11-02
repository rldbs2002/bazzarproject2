"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Link from "next/link";

const CartListItems = ({ data, selectedCart, onCartSelect }: any) => {
  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Select</TableCell>
              <TableCell>Cart ID</TableCell>
              <TableCell>Request ID</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(data).map((cartId) => {
              const cartData = data[cartId][0];
              const status = cartData.status;
              const isAdminOrStatus2Or3 = status === 2 || status === 3;

              return (
                <TableRow key={cartId}>
                  <TableCell>
                    <input
                      type="radio"
                      name="selectedCart"
                      checked={selectedCart === cartId}
                      onChange={() => onCartSelect(cartId)}
                    />
                  </TableCell>
                  <Link href={`/cart/${cartId}`}>{cartId}</Link>
                  <TableCell>
                    {data[cartId].map((userRequest) => (
                      <div key={userRequest.userRequest._id}>
                        Request ID: {userRequest.userRequest.request_id}
                      </div>
                    ))}
                  </TableCell>
                  <TableCell>{isAdminOrStatus2Or3 ? status : ""}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CartListItems;
