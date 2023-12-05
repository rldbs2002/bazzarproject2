"use client";

import React, { useState, useEffect } from "react";
import { Container, Grid } from "@mui/material";
import Address from "./Address";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getUserData } from "@/app/lib/data";

const AccountWrapper = () => {
  const router = useRouter();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getUserData();

        setUserData(result);
      } catch (error: any) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);
  console.log(userData);

  return (
    <Container sx={{ my: "1.5rem" }}>
      <Grid container spacing={3}>
        <Grid item xs={12}></Grid>

        <Grid item xs={12}>
          <Address data={userData} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AccountWrapper;
