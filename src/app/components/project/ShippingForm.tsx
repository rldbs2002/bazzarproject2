import React, { ChangeEvent, useState } from "react";
import { Button, Checkbox, TextField } from "@mui/material";

const ShippingForm = ({ data }: any) => {
  const [shippingCarrier, setShippingCarrier] = useState("");
  const [shippingNumber, setShippingNumber] = useState("");
  const [shippingCompleted, setShippingCompleted] = useState(false);

  const handleShippingCarrierChange = (e: ChangeEvent<HTMLInputElement>) => {
    setShippingCarrier(e.target.value);
  };

  const handleShippingNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    setShippingNumber(e.target.value);
  };

  const handleShippingCompletedChange = (e: ChangeEvent<HTMLInputElement>) => {
    setShippingCompleted(e.target.checked);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`/api/checkout/${data[0]._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          shipping: {
            shippingCarrier,
            shippingNumber,
            shippingCompleted,
            shipping_at: new Date(),
          },
        }),
      });

      if (response.ok) {
        // 성공적으로 처리된 경우의 로직을 추가하세요.
        console.log("Shipping information submitted successfully");
      } else {
        // 요청이 실패한 경우의 로직을 추가하세요.
        console.error("Failed to submit shipping information");
      }
    } catch (error) {
      // 오류 처리 로직을 추가하세요.
      console.error("An error occurred:", error);
    }
  };

  return (
    <>
      <TextField
        label="Shipping Carrier"
        variant="outlined"
        value={shippingCarrier}
        onChange={handleShippingCarrierChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Shipping Number"
        variant="outlined"
        value={shippingNumber}
        onChange={handleShippingNumberChange}
        fullWidth
        margin="normal"
      />
      <Checkbox
        checked={shippingCompleted}
        onChange={handleShippingCompletedChange}
        color="primary"
      />
      Shipping Completed
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </>
  );
};

export default ShippingForm;
