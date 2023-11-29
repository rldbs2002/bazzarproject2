"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button, Grid } from "@mui/material";

const NoticeContent = ({ data }: any) => {
  console.log(data);
  const router = useRouter();

  const handleEdit = () => {
    // 공지 ID를 전달하여 편집 페이지로 이동하는 로직을 구현합니다
    router.push(`/edit-notice/${data._id}`);
  };

  const handleDelete = async () => {
    // 공지를 삭제하는 로직을 구현합니다
    try {
      const response = await fetch(`/api/notice/${data._id}`, {
        method: "DELETE",
      });

      if (response.status === 200) {
        // 선택적으로 삭제 후 다른 페이지로 이동할 수 있습니다
        router.push("/notice");
      } else {
        console.error("공지 삭제 중 오류:", response.statusText);
      }
    } catch (error: any) {
      console.error("공지 삭제 중 오류:", error.message);
    }
  };

  return (
    <>
      <div>
        <h3
          style={{
            fontSize: "1.3em",
            margin: "10px 0",
            fontWeight: "bold",
          }}
        >
          {data.title}
        </h3>
        <p style={{ marginBottom: "1rem" }}>
          {new Date(data.date).toLocaleDateString()}
        </p>
        {/* 여기에 내용 등 필요한 정보 추가 */}
        <hr />

        <p style={{ marginTop: "2rem", marginBottom: "2rem" }}>
          {data.content}
        </p>

        {/* 편집 및 삭제 버튼 추가 */}
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Button variant="outlined" color="primary" onClick={handleEdit}>
              EDIT
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" color="error" onClick={handleDelete}>
              DELETE
            </Button>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default NoticeContent;
