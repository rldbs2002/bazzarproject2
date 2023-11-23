import React from "react";

import { useRouter } from "next/navigation";
import Consolidate from "../components/project/Consolidate";
import ShopLayout2 from "../components/layouts/ShopLayout2";
import SEO from "../components/SEO";
import { notFound } from "next/navigation";
import { getConsolidateData, getUserData } from "../lib/data";

const page = async () => {
  const data = await getConsolidateData();
  const userdata = await getUserData();

  return (
    <ShopLayout2>
      <SEO title="Checkout alternative" />

      <Consolidate data={data} userdata={userdata} />
    </ShopLayout2>
  );
};

export default page;
