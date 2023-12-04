"use client";

import React, { useState, ChangeEvent, useEffect, FC } from "react";
import { useRouter } from "next/navigation";
import { useMemo, useRef } from "react";
import "react-quill/dist/quill.snow.css";
import { Button, TextField, Box } from "@mui/material";
import { storage } from "@/Firebase";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import ReactQuill, { Quill } from "react-quill";
import QuillNoSSRWriter from "./QuillNoSSRWriter";

const EventEdit = ({ data }: any) => {
  const router = useRouter();
  const quillInstance = useRef<ReactQuill>(null);
  const [title, setTitle] = useState(data.title);
  const [content, setContent] = useState(data.content);
  const [eventData, setEventData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setEventData(data);
      } catch (error) {
        console.error("Error fetching notice data:", error);
      }
    };

    fetchData();
  }, [data]);

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
          ["blockquote"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ color: [] }, { background: [] }],
          [{ align: [] }, "link", "image"],
        ],
      },
      imageCompress: {
        maxWidth: 400,
        maxHeight: 400,
        debug: true, // default
        suppressErrorLogging: false,
        insertIntoEditor: undefined,
      },
      ImageResize: {
        modules: ["Resize", "DisplaySize"],
      },
    };
  }, []);

  const handleSave = async () => {
    try {
      // 실제로 서버에 업데이트하는 로직을 여기에 추가
      const requestData = {
        title: title,
        content: content,
      };

      const response = await fetch(`/api/event/${data._id}`, {
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
            setEventData(updatedData);
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

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        p={3}
      >
        <TextField
          label="Title"
          variant="outlined"
          value={title}
          style={{ marginBottom: 16, maxWidth: "1000px" }}
          onChange={handleTitleChange}
          fullWidth
        />

        <QuillNoSSRWriter
          forwardedRef={quillInstance}
          value={content}
          onChange={(value) => {
            setContent(value);
          }}
          modules={modules}
          theme="snow"
          placeholder="내용을 입력해주세요."
          style={{ maxWidth: "1000px", width: "100%", height: "auto" }}
        />
        <Button
          variant="outlined"
          color="primary"
          onClick={handleSave}
          style={{ marginTop: "3rem" }}
        >
          SAVE
        </Button>
      </Box>
    </>
  );
};

export default EventEdit;
