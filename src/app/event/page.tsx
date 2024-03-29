import React from "react";
import ShopLayout2 from "../components/layouts/ShopLayout2";
import SEO from "../components/SEO";
import EventWrapper from "../components/project/EventWrapper";

const page = () => {
  return (
    <ShopLayout2>
      <SEO title="Kgoods Event Page" description="Kgoods's event page" />
      <EventWrapper />
    </ShopLayout2>
  );
};

export default page;
