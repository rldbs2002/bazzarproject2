"use client";

import { useState } from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { AddressType } from "../../../../type";

const Address = ({ data }: any) => {
  const [allAddress, setAllAddress] = useState<AddressType[]>([]);
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

  return (
    <>
      {/* Render existing addresses */}
      {data?.arrived_info.map((address: AddressType) => (
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
