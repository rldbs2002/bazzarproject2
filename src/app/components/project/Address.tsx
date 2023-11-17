"use client";

import { useState } from "react";
import { Button } from "@mui/material";

import NewAddressModal from "../../components/project/NewAddressModal";
import countryList from "@/app/data/countryList";
import { useSession } from "next-auth/react";

const Address = () => {
  const [allAddress, setAllAddress] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddressDelete = (id: string) => {
    // 주소 삭제 로직 구현
  };

  const handleAddNewAddress = () => {
    setIsAddModalOpen(true);
  };

  const handleCancelAddNewAddress = () => {
    setIsAddModalOpen(false);
  };

  const handleFormSubmit = async (values: any) => {
    const requestData = {
      arrived_info: {
        firstname: values.firstname,
        lastname: values.lastname,
        country: values.country,
        address: values.address,
        city: values.city,
        state: values.state,
        postal_code: values.postal_code,
        phone: values.phone,
      },
    };

    try {
      const response = await fetch("/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.status === 200) {
        // 여기서 추가된 주소를 처리하고 모달을 닫을 수 있습니다.
        console.log("Address added successfully!");
        setIsAddModalOpen(false);
      } else {
        console.error("Failed to add address. Status:", response.status);
        // 실패 처리 로직 추가
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      // 에러 처리 로직 추가
    }
  };

  return (
    <>
      <Button
        color="primary"
        sx={{ bgcolor: "primary.light", px: 4 }}
        onClick={handleAddNewAddress}
      >
        Add New Address
      </Button>
      {isAddModalOpen && (
        <NewAddressModal
          initialValues={{
            firstname: "",
            lastname: "",
            country: countryList[229],
            address: "",
            city: "",
            state: "",
            postal_code: "",
            phone: "",
          }}
          onSubmit={handleFormSubmit}
          onCancel={handleCancelAddNewAddress}
        />
      )}
      {/* Render existing addresses */}
    </>
  );
};

export default Address;
