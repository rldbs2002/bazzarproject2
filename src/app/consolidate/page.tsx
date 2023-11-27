import React from "react";
import ShopLayout2 from "../components/layouts/ShopLayout2";
import SEO from "../components/SEO";
import ConsolidateWrapper from "../components/project/ConsolidateWrapper";

const page = async () => {
  return (
    <ShopLayout2>
      <SEO title="Checkout alternative" />

      {/* <Consolidate data={data} userdata={userdata} /> */}
      <ConsolidateWrapper />
    </ShopLayout2>
  );
};

export default page;
