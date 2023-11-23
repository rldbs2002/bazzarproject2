import React, { FC } from "react";
import Shipping from "../components/project/Shipping";
import ShopLayout2 from "../components/layouts/ShopLayout2";
import SEO from "../components/SEO";
import { getShippingData, getUserData } from "../lib/data";

const page = async () => {
  const data = await getShippingData();
  const userdata = await getUserData();

  return (
    <ShopLayout2>
      <SEO title="Checkout alternative" />

      <Shipping data={data} userdata={userdata} />
    </ShopLayout2>
  );
};

export default page;
