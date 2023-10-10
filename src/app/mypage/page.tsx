"use client";

import RequestTable from "../components/project/RequestTable";
import { Container, Grid } from "@mui/material";
import ShopLayout2 from "../components/layouts/ShopLayout2";
import SEO from "../components/SEO";
import { NextPage } from "next";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Footer3 } from "../components/footer";
import Navigations from "../components/layouts/customer-dashboard/Navigations";

export async function getData() {
  const res = await fetch("http://localhost:3000/api/request", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

const MyPage: NextPage = async () => {
  // const router = useRouter();

  // const { data: session } = useSession({
  //   required: true,
  //   onUnauthenticated() {
  //     router.push("/api/auth/signin?callbackUrl=/");
  //   },
  // });

  // if (!session?.user) return null;

  const data = await getData();

  return (
    <ShopLayout2>
      <SEO title="Checkout alternative" />
      <Container sx={{ my: "1.5rem" }}>
        <Grid container spacing={3}>
          {/* <Grid
            item
            lg={3}
            xs={12}
            sx={{ display: { xs: "none", sm: "none", md: "block" } }}
          >
            <Navigations />
          </Grid> */}
          <Grid item xs={12}>
            <RequestTable data={data} isServerTable={false} />
          </Grid>
        </Grid>
      </Container>
      <Footer3 />
    </ShopLayout2>
  );
};

export default MyPage;
