"use client";

import { useEffect, useState } from "react";
import { Container } from "@mui/material";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { getRequestsData } from "@/app/lib/data";
import AdminRequest2 from "./AdminRequest2";

const AdminRequestWrapper = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/");
    },
  });

  return (
    <Container
      sx={{ my: "1.5rem", maxWidth: "80%", mx: "auto", minHeight: "520px" }}
    >
      <AdminRequest2 />
    </Container>
  );
};

export default AdminRequestWrapper;
