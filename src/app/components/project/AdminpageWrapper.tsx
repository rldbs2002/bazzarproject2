"use client";

import React from "react";
import { Grid } from "@mui/material";
import { useSession } from "next-auth/react";
import { Paragraph } from "../Typography";
import AdminDashboard from "./AdminDashboard";
import AdminDailyStatus from "./AdminDailyStatus";

const AdminpageWrapper = () => {
  const { data: session } = useSession();
  console.log(session);
  const lastLoginDate = session?.expires ? new Date(session.expires) : null;

  return (
    <>
      <Grid container spacing={3}>
        <Grid item sm={6} xs={12}>
          <AdminDashboard />
        </Grid>
        <Grid item sm={6} xs={12}>
          <AdminDailyStatus />
        </Grid>
      </Grid>
      <Paragraph
        style={{
          fontSize: "1rem",
          marginTop: "4rem",
          marginBottom: "4rem",
        }}
      >
        Lastest Loggin Date: {lastLoginDate?.toLocaleString()}
      </Paragraph>
    </>
  );
};

export default AdminpageWrapper;
