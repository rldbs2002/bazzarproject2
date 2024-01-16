"use client";

import React from "react";
import { Grid, Container, Box } from "@mui/material";
import Card1 from "../Card1";
import Notice from "./Notice";
import { useSession } from "next-auth/react";
import { H2 } from "../Typography";

const NoticeWrapper = () => {
  const { data: session } = useSession();
  console.log(session);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Box sx={{ backgroundColor: "grey.100" }}>
          <Container sx={{ py: 6, maxWidth: "80%" }}>
            <H2
              fontSize={36}
              textAlign="center"
              fontWeight="700"
              color="secondary.main"
              mb={5}
              textTransform="uppercase"
            >
              notice
            </H2>
          </Container>
        </Box>
        <Container sx={{ my: "5rem", maxWidth: "80%", mx: "auto" }}>
          <Card1>
            <Notice />
          </Card1>
        </Container>
      </Grid>
    </Grid>
  );
};

export default NoticeWrapper;
