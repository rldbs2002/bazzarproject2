import React, { useState } from "react";
import styles from "./page.module.css";
import SignUpForm from "../components/project/SignUpForm";
import SignUpForm2 from "../components/project/SignUpForm2";

const SignUpPage = () => {
  return (
    <div className={styles.container}>
      <SignUpForm />
    </div>
  );
};
export default SignUpPage;
