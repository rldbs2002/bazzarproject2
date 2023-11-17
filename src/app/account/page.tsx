"use client";

import React from "react";
import ShopLayout2 from "../components/layouts/ShopLayout2";
import { Container, Grid } from "@mui/material";
import Profile from "../components/project/Profile";
import { useSession } from "next-auth/react";
import Address from "../components/project/Address";

const page = () => {
  const { data: session } = useSession();

  console.log(session?.user);

  return (
    <ShopLayout2>
      <Container sx={{ my: "1.5rem" }}>
        <Grid container spacing={3}>
          <Grid item md={6} xs={12}>
            <Profile session={session} />
          </Grid>

          <Grid item md={6} xs={12}>
            <Address />
          </Grid>
        </Grid>
      </Container>
    </ShopLayout2>
  );
};

export default page;
