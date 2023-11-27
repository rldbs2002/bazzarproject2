import React, { FC } from "react";
import ShopLayout2 from "../components/layouts/ShopLayout2";
import SEO from "../components/SEO";
import ShippingWrapper from "../components/project/ShippingWrapper";

const page = async () => {
  return (
    <ShopLayout2>
      <SEO title="Checkout alternative" />

      {/* <Shipping data={data} userdata={userdata} /> */}
      <ShippingWrapper />
    </ShopLayout2>
  );
};

export default page;
