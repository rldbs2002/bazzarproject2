import React, { FC } from "react";
import Repacking from "../components/project/Repacking";
import ShopLayout2 from "../components/layouts/ShopLayout2";
import SEO from "../components/SEO";
import { getRepackingData, getUserData } from "../lib/data";

const page = async () => {
  const data = await getRepackingData();
  const userdata = await getUserData();

  return (
    <ShopLayout2>
      <SEO title="Checkout alternative" />

      <Repacking data={data} userdata={userdata} />
    </ShopLayout2>
  );
};

export default page;
