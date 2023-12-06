"use client";
import { useEffect, useState } from "react";

import { Card, Container, Grid } from "@mui/material";
import SEO from "../SEO";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import ShopLayout2 from "../layouts/ShopLayout2";
import { getCartsData, getRequestsData } from "@/app/lib/data";
import AdminCart from "./AdminCart";

const AdminCartWrapper = () => {
  const router = useRouter();
  const [requestData, setRequestData] = useState({});

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/");
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getCartsData();

        setRequestData(result);
      } catch (error: any) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  console.log(requestData);

  return (
    <ShopLayout2>
      <SEO title="Cart" />
      <Container sx={{ my: "1.5rem" }}>
        <Grid container spacing={3}>
          {/* CART PRODUCT LIST */}
          <Grid xs={12}>
            <Card sx={{ mb: 4 }}>
              <AdminCart data={requestData} session={session} />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </ShopLayout2>
  );
};

export default AdminCartWrapper;
