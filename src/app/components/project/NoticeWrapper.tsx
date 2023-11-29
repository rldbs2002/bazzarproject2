"use client";

import React from "react";
import { Grid, Container } from "@mui/material";
import Card1 from "../Card1";
import Notice from "./Notice";
import RichTextEditor from "./RichTextEditor";
import { useSession } from "next-auth/react";

const NoticeWrapper = () => {
  const { data: session } = useSession();
  console.log(session);

  return (
    <Grid container spacing={3}>
      <Grid item sm={6} xs={12}>
        <Container sx={{ my: "1.5rem" }}>
          <Card1>
            <Notice />
          </Card1>
        </Container>
      </Grid>

      {session?.user.role === "admin" && (
        <Grid item sm={6} xs={12}>
          <Container sx={{ my: "1.5rem" }}>
            <Card1>
              <RichTextEditor />
            </Card1>
          </Container>
        </Grid>
      )}
    </Grid>
  );
};

export default NoticeWrapper;
