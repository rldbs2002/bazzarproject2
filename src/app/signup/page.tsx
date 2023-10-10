import React, { useState } from "react";
import styles from "./page.module.css";
import SignUpForm from "../components/SignUpForm";

const SignUpPage = () => {
  return (
    <div className={styles.container}>
      <SignUpForm />
    </div>
  );
};
export default SignUpPage;
