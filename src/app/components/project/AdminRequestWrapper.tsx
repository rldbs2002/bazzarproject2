"use client";
import { useEffect, useState } from "react";

import { NextPage } from "next";
import { Card, Container, Grid } from "@mui/material";
import SEO from "../SEO";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import CartListItems from "./CartListItems";
import { useRouter } from "next/navigation";
import ShopLayout2 from "../layouts/ShopLayout2";
import { getRequestsData } from "@/app/lib/data";
import AdminRequest from "./AdminRequest";
import AdminRequest2 from "./AdminRequest2";

const AdminRequestWrapper = () => {
  const router = useRouter();
  const [requestData, setRequestData] = useState({});
  console.log(requestData);

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/");
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getRequestsData();

        setRequestData(result);
      } catch (error: any) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <Container
      sx={{ my: "1.5rem", maxWidth: "80%", mx: "auto", minHeight: "520px" }}
    >
      {/* <AdminRequest data={requestData} session={session} /> */}
      <AdminRequest2 />
    </Container>
  );
};

export default AdminRequestWrapper;
