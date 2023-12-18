import React from "react";
import SEO from "../components/SEO";
import ShopLayout2 from "../components/layouts/ShopLayout2";
import ChecklistWrapper from "../components/project/ChecklistWrapper";

const CheckoutPage = () => {
  return (
    <ShopLayout2>
      <SEO title="Checkout" />
      <ChecklistWrapper />
    </ShopLayout2>
  );
};

export default CheckoutPage;
