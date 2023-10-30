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
}: any) => {
  const handleAccordionClick = (cartId: string) => {
    if (cartId === selectedAccordion) {
      setSelectedAccordion(null); // 클릭한 아코디언이 이미 열려있는 경우 닫습니다.
    } else {
      setSelectedAccordion(cartId); // 클릭한 아코디언을 엽니다.
    }
  };

  // Handle radio button click and notify the parent component
  const handleRadioClick = (cartId: string) => {
    onRadioClick(cartId);
  };

  return (
    <>
      {Object.keys(data).map((cartId) => (
        <Accordion
          key={cartId}
          expanded={cartId === selectedAccordion}
          onChange={() => handleAccordionClick(cartId)}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Radio
              checked={cartId === selectedAccordion}
              onChange={() => handleRadioClick(cartId)} // Handle radio button click
              value={cartId}
            />
            <Typography>
              {data[cartId][0].cartOptions}Cart ID: {cartId}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {data[cartId].map((userRequest) => (
              <div key={userRequest.userRequest._id}>
                <Typography>
                  Request ID: {userRequest.userRequest.request_id}
                </Typography>
                {/* Render other userRequest data here */}
                <Form data={userRequest.userRequest} />
                {/* userRequest 데이터를 Form 컴포넌트에 전달 */}
              </div>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};

export default CartListItems;
