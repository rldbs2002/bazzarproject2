"use client";

import { useState } from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import NewAddressModal from "../../components/project/NewAddressModal";
import countryList from "@/app/data/countryList";
import { useSession } from "next-auth/react";

const Address = ({ data }: any) => {
  const [allAddress, setAllAddress] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDefault, setIsDefault] = useState(false); // Add this line
  const { data: session } = useSession();

  // 주소 삭제 함수
  const handleAddressDelete = async (id: string) => {
    try {
      // 서버에 삭제 요청을 보냄
      const response = await fetch("/api/user", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          addressId: id,
          email: session?.user.email,
        }),
      });

      if (response.status === 200) {
        console.log("주소가 성공적으로 삭제되었습니다!");
        // 삭제된 주소를 제외한 나머지 주소를 유지
        setAllAddress(allAddress.filter((address) => address._id !== id));
      } else {
        console.error("주소 삭제에 실패했습니다. 상태:", response.status);
      }
    } catch (error) {
      console.error("데이터 삭제 중 오류 발생:", error);
    }
  };

  const handleAddNewAddress = () => {
    setIsAddModalOpen(true);
  };

  const handleCancelAddNewAddress = () => {
    setIsAddModalOpen(false);
  };

  const handleFormSubmit = async (values: any) => {
    const newAddress = {
      firstname: values.firstname,
      lastname: values.lastname,
      country: values.country,
      address: values.address,
      city: values.city,
      state: values.state,
      postal_code: values.postal_code,
      phone: values.phone,
    };

    try {
      const response = await fetch("/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          arrived_info: isDefault
            ? [newAddress, ...allAddress]
            : [...allAddress, newAddress],
          email: session?.user.email,
        }),
      });

      if (response.status === 200) {
        console.log("주소가 성공적으로 추가되었습니다!");
        setAllAddress((prevAllAddress) =>
          isDefault
            ? [newAddress, ...prevAllAddress]
            : [...prevAllAddress, newAddress]
        );
        setIsAddModalOpen(false);
      } else {
        console.error("주소 추가에 실패했습니다. 상태:", response.status);
      }
    } catch (error) {
      console.error("데이터 제출 중 오류 발생:", error);
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
          isDefault={isDefault} // Pass isDefault to the modal
          onCheckboxChange={() => setIsDefault(!isDefault)} // Add a callback for checkbox change
        />
      )}
      {/* Render existing addresses */}
      {data?.arrived_info.map((address: any) => (
        <Card key={address._id} sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography variant="h6">
              {`${address.firstname} ${address.lastname}`}
            </Typography>
            <Typography>{address.address}</Typography>
            <Typography>{`${address.city}, ${address.state} ${address.postal_code}`}</Typography>
            <Typography>{`Phone: ${address.phone}`}</Typography>
            {/* 삭제 버튼 추가 */}
            <Button
              onClick={() => handleAddressDelete(address._id)}
              color="error"
            >
              Delete
            </Button>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default Address;
