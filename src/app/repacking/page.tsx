import React from "react";
import ShopLayout2 from "../components/layouts/ShopLayout2";
import RepackingWrapper from "../components/project/RepackingWrapper";

const page = async () => {
  return (
    <ShopLayout2>
      {/* <Repacking userdata={userdata} /> */}
      <RepackingWrapper />
    </ShopLayout2>
  );
};

export default page;
