"use client";
import { useEffect, useState } from "react";

import { Container } from "@mui/material";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { getCartsData } from "@/app/lib/data";
import AdminCart from "./AdminCart";

const AdminCartWrapper = () => {
  const router = useRouter();
  const [cartData, setCartData] = useState([]);

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/");
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getCartsData();

        setCartData(result);
      } catch (error: any) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  console.log(cartData);

  return (
    <Container
      sx={{
        my: "1.5rem",
        maxWidth: ["100%", "80%"],
        mx: "auto",
        minHeight: "520px",
      }}
    >
      <AdminCart data={cartData} />
    </Container>
  );
};

export default AdminCartWrapper;
