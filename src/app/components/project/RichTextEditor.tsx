"use client";

import React, { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { useMemo, useRef } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { Button, TextField, Box } from "@mui/material";

const RichTextEditor = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const quillRef = useRef<ReactQuill | null>(null);
  const [content, setContent] = useState("");

  // quill에서 사용할 모듈
  // useMemo를 사용하여 modules가 렌더링 시 에디터가 사라지는 버그를 방지
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
    };
  }, []);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const extractTextFromHTML = (htmlString: string) => {
    const doc = new DOMParser().parseFromString(htmlString, "text/html");
    return doc.body.textContent || "";
  };

  const handleSubmit = async () => {
    const cleanedModel = extractTextFromHTML(content);

    const requestData = {
      model: cleanedModel,
      title,
    };
    try {
      const response = await fetch("/api/notice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.status === 200) {
        router.push("/notice");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
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
        onChange={handleTitleChange}
        style={{ marginBottom: 16 }}
        fullWidth
      />

      <ReactQuill
        style={{ width: "auto", height: "600px" }}
        placeholder="Quill Content"
        theme="snow"
        ref={quillRef}
        value={content}
        onChange={setContent}
        modules={modules}
      />

      <Button
        onClick={handleSubmit}
        variant="contained"
        color="primary"
        style={{ marginTop: 16 }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default RichTextEditor;
