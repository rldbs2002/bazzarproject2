import React from "react";
import ShopLayout2 from "../components/layouts/ShopLayout2";
import ShippingWrapper from "../components/project/ShippingWrapper";

const page = async () => {
  return (
    <ShopLayout2>
      {/* <Shipping data={data} userdata={userdata} /> */}
      <ShippingWrapper />
    </ShopLayout2>
  );
};

export default page;
