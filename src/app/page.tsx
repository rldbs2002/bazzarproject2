"use client";

import { useState } from "react";
import { Footer1, Footer2, Footer3 } from "./components/footer";
import Section1 from "./landing/Section1";
import Section3 from "./landing/Section3";
import Section6 from "./landing/Section6";

import { Box } from "@mui/material";
import Section8 from "./landing/Section8";
import Header from "./landing/Header";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Home = () => {
  const [filterDemo, setFilterDemo] = useState("");

  const router = useRouter();

  const { data: session } = useSession({
    required: true,
    //  onUnauthenticated() {
    //    router.push("/api/auth/signin?callbackUrl=/");
    //  },
  });

  console.log(session?.user);

  if (!session?.user) return null;

  return (
    <>
      <Box id="top" overflow="hidden" bgcolor="background.paper">
        <Header />
        <Section1 />
        <Section6 setFilterDemo={setFilterDemo} />
        {/* <Section3 filterDemo={filterDemo} setFilterDemo={setFilterDemo} /> */}
        <Section8 setFilterDemo={setFilterDemo} />
        <Footer3 />
      </Box>
    </>
  );
};

export default Home;
