import React from "react";
import ShopLayout2 from "../components/layouts/ShopLayout2";
import ConsolidateWrapper from "../components/project/ConsolidateWrapper";

const page = async () => {
  return (
    <ShopLayout2>
      {/* <Consolidate data={data} userdata={userdata} /> */}
      <ConsolidateWrapper />
    </ShopLayout2>
  );
};

export default page;
