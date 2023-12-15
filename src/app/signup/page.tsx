import React, { useState } from "react";
import styles from "./page.module.css";
import SignUpForm from "../components/project/SignUpForm";
import SignUpForm2 from "../components/project/SignUpForm2";
import ShopLayout2 from "../components/layouts/ShopLayout2";

const SignUpPage = () => {
  return (
    <ShopLayout2>
      <SignUpForm />
    </ShopLayout2>
  );
};
export default SignUpPage;
