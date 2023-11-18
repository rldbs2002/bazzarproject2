"use client";

import React from "react";
import { Container, Grid } from "@mui/material";
import Profile from "./Profile";
import Address from "./Address";
import { useSession } from "next-auth/react";

const AccountLayer = ({ data }: any) => {
  const { data: session } = useSession();

  console.log(session?.user);

  return (
    <Container sx={{ my: "1.5rem" }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Profile session={session} />
        </Grid>

        <Grid item xs={12}>
          <Address data={data} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AccountLayer;
