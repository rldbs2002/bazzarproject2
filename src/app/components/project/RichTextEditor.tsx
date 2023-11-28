import React, { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css"; // Quill 에디터 스타일
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const RichTextEditor = () => {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const handleTitleChange = (e: any) => {
    setTitle(e.currentTarget.value);
  };

  const handleSubmit = async () => {
    const date = new Date();
    const requestData = {
      date,
      content,
      title,
    };
    try {
      const response = await fetch("/api/request", {
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

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
    "video",
  ];

  const handleContentChange = (value: any) => {
    setContent(value);
  };

  const handleSave = () => {
    // 여기에서 content를 저장하는 로직을 추가하면 됩니다.
    console.log("Saving content:", content);
  };

  return (
    <>
      <div>
        <label htmlFor="title">제목</label>
        <input id="title" type="text" onChange={handleTitleChange} />
        <ReactQuill
          style={{ width: "800px", height: "600px" }}
          modules={modules}
          onChange={setContent}
        />
      </div>
      <button style={{ marginTop: "50px" }} onClick={handleSubmit}>
        제출
      </button>
    </>
  );
};

export default RichTextEditor;
