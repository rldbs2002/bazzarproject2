"use client";

import React from "react";
import { Grid, Container } from "@mui/material";
import Card1 from "../Card1";
import { useSession } from "next-auth/react";
import Event from "./Event";

const EventWrapper = () => {
  const { data: session } = useSession();
  console.log(session);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Container sx={{ my: "1.5rem" }}>
          <Card1>
            <Event />
          </Card1>
        </Container>
      </Grid>

      {session?.user.role === "admin" && <></>}
    </Grid>
  );
};

export default EventWrapper;
