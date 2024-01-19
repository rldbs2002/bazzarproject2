import React from "react";
import ShopLayout2 from "../components/layouts/ShopLayout2";
import { Container } from "@mui/material";
import AdminpageWrapper from "../components/project/AdminpageWrapper";
export const dynamic = "force-dynamic";

const AdminPage = async () => {
  return (
    <ShopLayout2>
      <Container sx={{ my: "1.5rem", maxWidth: ["100%", "80%"], mx: "auto" }}>
        <AdminpageWrapper />
      </Container>
    </ShopLayout2>
  );
};

export default AdminPage;
