"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Grid, Button } from "@mui/material";
import RichTextEditor2 from "./RichTextEditor2";

const NoticeEdit = ({ data }: any) => {
  return (
    <>
      <div style={{ marginBottom: "3rem" }}>
        <RichTextEditor2 data={data} />
      </div>
      {/* 편집 및 삭제 버튼 추가 */}
      <Grid container spacing={2} justifyContent="center">
        <Grid item></Grid>
      </Grid>
    </>
  );
};

export default NoticeEdit;
