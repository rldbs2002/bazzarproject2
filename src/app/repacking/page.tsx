import React, { FC } from "react";
import ShopLayout2 from "../components/layouts/ShopLayout2";
import SEO from "../components/SEO";
import RepackingWrapper from "../components/project/RepackingWrapper";

const page = async () => {
  return (
    <ShopLayout2>
      <SEO title="Checkout alternative" />

      {/* <Repacking userdata={userdata} /> */}
      <RepackingWrapper />
    </ShopLayout2>
  );
};

export default page;
