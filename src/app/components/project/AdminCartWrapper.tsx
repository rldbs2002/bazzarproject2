"use client";
import { useEffect, useState } from "react";

import { Card, Container, Grid } from "@mui/material";
import SEO from "../SEO";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import ShopLayout2 from "../layouts/ShopLayout2";
import { getCartsData, getRequestsData } from "@/app/lib/data";
import AdminCart from "./AdminCart";

const AdminCartWrapper = () => {
  const router = useRouter();
  const [cartData, setCartData] = useState({});

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
    <Container sx={{ my: "1.5rem", maxWidth: "80%", mx: "auto" }}>
      <AdminCart data={cartData} session={session} />
    </Container>
  );
};

export default AdminCartWrapper;
