import React from "react";
import ShopLayout2 from "../components/layouts/ShopLayout2";
import { Container } from "@mui/material";
import { Paragraph } from "../components/Typography";
import AdminpageWrapper from "../components/project/AdminpageWrapper";

const AdminPage = () => {
  return (
    <ShopLayout2>
      <Container sx={{ my: "1.5rem" }}>
        <AdminpageWrapper />
      </Container>
    </ShopLayout2>
  );
};

export default AdminPage;
