import React from "react";
import ShopLayout2 from "../components/layouts/ShopLayout2";
import SEO from "../components/SEO";
import HowToUse from "../components/project/HowToUse";

const page = () => {
  return (
    <ShopLayout2>
      <SEO title="Kgoods Manual Page" description="Kgoods's manual page" />
      <HowToUse />
    </ShopLayout2>
  );
};

export default page;
