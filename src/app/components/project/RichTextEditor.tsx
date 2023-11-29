"use client";

import dynamic from "next/dynamic";
import React, { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { useMemo, useRef } from "react";
import "react-quill/dist/quill.snow.css";
import { Button, TextField, Box } from "@mui/material";
import { storage } from "@/Firebase";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const RichTextEditor = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");

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

  // 이미지 핸들러
  // const imageHandler = async () => {
  //   const input = document.createElement("input");
  //   input.setAttribute("type", "file");
  //   input.setAttribute("accept", "image/*");
  //   input.click();

  //   input.addEventListener("change", async () => {
  //     const file = input.files[0];

  //     try {
  //       // 파일명을 "image/Date.now()"로 저장
  //       const storageRef = ref(storage, `image/${Date.now()}`);
  //       // Firebase Method: uploadBytes, getDownloadURL
  //       const snapshot = await uploadBytes(storageRef, file);
  //       const url = await getDownloadURL(snapshot.ref);

  //       // 이미지 URL 에디터에 삽입
  //       const editor = quillRef.current.getEditor();
  //       const range = editor.getSelection(true);
  //       editor.insertEmbed(range.index, "image", url);
  //       // URL 삽입 후 커서를 이미지 뒷 칸으로 이동
  //       editor.setSelection(range.index + 1);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   });
  // };

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
      <button onClick={() => console.log(content)}>Value</button>
    </Box>
  );
};

export default RichTextEditor;
