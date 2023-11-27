import React from "react";
import ShopLayout2 from "../components/layouts/ShopLayout2";
import AccountLayer from "../components/project/AccountWrapper";

const page = async () => {
  return (
    <ShopLayout2>
      <AccountLayer />
    </ShopLayout2>
  );
};

export default page;
