"use client";

import { useEffect, useState } from "react";
import { Container } from "@mui/material";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { getAllCheckoutData } from "@/app/lib/data";
import AdminCheckout from "./AdminCheckout";

const AdminCheckoutWrapper = () => {
  const router = useRouter();
  const [requestData, setRequestData] = useState([]);

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/");
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllCheckoutData();

        setRequestData(result);
      } catch (error: any) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  console.log(requestData);

  return (
    <Container
      sx={{ my: "1.5rem", maxWidth: "80%", mx: "auto", minHeight: "520px" }}
    >
      <AdminCheckout data={requestData} session={session} />
    </Container>
  );
};

export default AdminCheckoutWrapper;
