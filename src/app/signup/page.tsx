import React, { useState } from "react";
import SignUpForm from "../components/project/SignUpForm";
import SEO from "../components/SEO";
import ShopLayout2 from "../components/layouts/ShopLayout2";

const SignUpPage = () => {
  return (
    <ShopLayout2>
      <SEO title="Kgoods Sign-Up Page" description="Kgoods's sign-up page" />
      <SignUpForm />
    </ShopLayout2>
  );
};
export default SignUpPage;
