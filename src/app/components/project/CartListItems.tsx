"use client";

import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Radio,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Form from "./Form";

const CartListItems = ({
  data,
  selectedAccordion,
  setSelectedAccordion,
  onRadioClick, // Add a prop for radio button click callback
  session, // Add a prop for the user session
}: any) => {
  const handleAccordionClick = (cartId: string) => {
    if (cartId === selectedAccordion) {
      setSelectedAccordion(null);
    } else {
      setSelectedAccordion(cartId);
    }
  };

  const handleRadioClick = (cartId: string) => {
    onRadioClick(cartId);
  };

  // Check if there is any cart data to show
  const hasCartData = Object.keys(data).some((cartId) => {
    const cartData = data[cartId][0];
    const status = cartData.status;
    return session?.user.role === "admin" || status === 2 || status === 3;
  });

  return (
    <>
      {hasCartData ? (
        Object.keys(data).map((cartId) => {
          const cartData = data[cartId][0];
          const status = cartData.status;
          const isAdminOrStatus2Or3 =
            session?.user.role === "admin" || status === 2 || status === 3;

          if (isAdminOrStatus2Or3) {
            return (
              <Accordion
                key={cartId}
                expanded={cartId === selectedAccordion}
                onChange={() => handleAccordionClick(cartId)}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Radio
                    checked={cartId === selectedAccordion}
                    onChange={() => handleRadioClick(cartId)}
                    value={cartId}
                  />
                  <Typography>
                    {cartData.cartOptions}Cart ID: {cartId}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {data[cartId].map((userRequest) => (
                    <div key={userRequest.userRequest._id}>
                      <Typography>
                        Request ID: {userRequest.userRequest.request_id}
                      </Typography>
                      <Form data={userRequest.userRequest} />
                    </div>
                  ))}
                </AccordionDetails>
              </Accordion>
            );
          }
          return null;
        })
      ) : (
        <Typography>Cart Data is Empty</Typography>
      )}
    </>
  );
};

export default CartListItems;
