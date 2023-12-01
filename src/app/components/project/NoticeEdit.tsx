"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Grid, Button } from "@mui/material";
import RichTextEditor2 from "./RichTextEditor2";

const NoticeEdit = ({ data }: any) => {
  const [noticeData, setNoticeData] = useState<any>(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const router = useRouter();

  const handleTitleChange = (newTitle: string) => {
    setEditedTitle(newTitle);
  };

  const handleContentChange = (content: string) => {
    // RichTextEditor 내용이 변경될 때 호출되는 콜백
    setEditedContent(content);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setNoticeData(data);
        setEditedContent(data.content);
      } catch (error) {
        console.error("Error fetching notice data:", error);
      }
    };

    fetchData();
  }, [data]);

  const handleSave = async () => {
    try {
      // 실제로 서버에 업데이트하는 로직을 여기에 추가
      const requestData = {
        title: editedTitle,
        content: editedContent,
      };

      const response = await fetch(`/api/notice/${data._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        try {
          // 서버 응답을 JSON으로 파싱
          const updatedData = await response.json();
          console.log("updatedData:", updatedData);

          // 서버 응답이 유효한 JSON일 경우에만 실행
          if (updatedData) {
            setNoticeData(updatedData);
          }
        } catch (jsonError) {
          // JSON 파싱 에러 처리
          console.error("Error parsing JSON:", jsonError);
        }
      } else {
        // 서버 응답이 성공이 아닌 경우 에러 처리
        console.error("Failed to update notice:", response.statusText);
      }
    } catch (error) {
      // 기타 에러 처리
      console.error("Error saving data:", error);
    } finally {
      router.push("/notice");
    }
  };

  return (
    <>
      <div style={{ marginBottom: "3rem" }}>
        <RichTextEditor2
          initialContent={data.content}
          initialTitle={data.title}
          onTitleChange={handleTitleChange}
          onContentChange={handleContentChange}
        />
      </div>
      {/* 편집 및 삭제 버튼 추가 */}
      <Grid container spacing={2} justifyContent="center">
        <Grid item>
          <Button variant="outlined" color="primary" onClick={handleSave}>
            SAVE
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default NoticeEdit;
