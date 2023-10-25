"use client";

import { signOut } from "next-auth/react";
import Button from "@mui/material/Button"; // Material-UI 버튼 임포트

export default function SignOut() {
  // 로그아웃 처리
  const handleSignOut = () => {
    signOut({ callbackUrl: "/" }); // 로그아웃 후 리다이렉트할 URL 설정
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Button variant="contained" color="primary" onClick={handleSignOut}>
        Sign Out
      </Button>
    </div>
  );
}
