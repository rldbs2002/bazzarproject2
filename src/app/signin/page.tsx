import React from "react";
import ShopLayout2 from "../components/layouts/ShopLayout2";
import SignIn from "../components/project/SignIn";
import SEO from "../components/SEO";

const page = () => {
  return (
    <ShopLayout2>
      <SEO
        title="Kgoods Sign-In Page"
        description="Kgoods's sign-in page"
      />
      <SignIn />
    </ShopLayout2>
  );
};

export default page;
