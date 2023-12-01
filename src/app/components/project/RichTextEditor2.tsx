"use client";

import dynamic from "next/dynamic";
import React, { useState, ChangeEvent, useEffect, FC } from "react";
import { useRouter } from "next/navigation";
import { useMemo, useRef } from "react";
import "react-quill/dist/quill.snow.css";
import { Button, TextField, Box } from "@mui/material";
import { storage } from "@/Firebase";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import ReactQuill, { Quill } from "react-quill";
import QuillNoSSRWriter from "./QuillNoSSRWriter";

interface RichTextEditorProps {
  initialTitle?: string;
  initialContent?: string;
  onTitleChange: (content: string) => void;
  onContentChange: (content: string) => void;
}

const RichTextEditor2: React.FC<RichTextEditorProps> = ({
  initialContent,
  initialTitle,
  onContentChange,
  onTitleChange,
}) => {
  const router = useRouter();
  const quillInstance = useRef<ReactQuill>(null);
  const [title, setTitle] = useState(initialTitle || "");
  const [content, setContent] = useState(initialContent || "");

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
      ImageResize: {
        modules: ["Resize", "DisplaySize"],
      },
    };
  }, []);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);

    onTitleChange(e.currentTarget.value);
  };

  // useEffect(() => {
  //   const quill = quillRef.current;

  //   // 이미지 핸들러
  //   const imageHandler = () => {
  //     const input = document.createElement("input");
  //     input.setAttribute("type", "file");
  //     input.setAttribute("accept", "image/*");
  //     input.click();
  //     input.addEventListener("change", async () => {
  //       const editor = quillRef.current?.getEditor();
  //       const fileInput = input.files;

  //       // null 체크
  //       if (fileInput && fileInput.length > 0) {
  //         const file = fileInput[0];
  //         const range = editor?.getSelection(true);

  //         // editor와 range가 정의되어 있을 때 실행
  //         if (editor && range) {
  //           try {
  //             // 파일명을 "image/Date.now()"로 저장
  //             const storageRef = ref(storage, `image/${Date.now()}`);
  //             // Firebase Method : uploadBytes, getDownloadURL
  //             await uploadBytes(storageRef, file).then((snapshot) => {
  //               getDownloadURL(snapshot.ref).then((url) => {
  //                 // 이미지 URL 에디터에 삽입
  //                 editor.insertEmbed(range.index, "image", url);

  //                 // 새로운 Range 객체 생성
  //                 const newPosition = range.index + 1;
  //                 const newRange = {
  //                   index: newPosition,
  //                   length: 0,
  //                   start: newPosition,
  //                 };

  //                 // 새로운 Range로 커서 이동
  //                 editor.setSelection(newRange);
  //               });
  //             });
  //           } catch (error) {
  //             console.log(error);
  //           }
  //         } else {
  //           console.error("Quill editor or selection range is not available");
  //         }
  //       }
  //     });
  //   };

  //   if (quill) {
  //     const toolbar = quill.getEditor().getModule("toolbar");
  //     if (toolbar) {
  //       toolbar.addHandler("image", imageHandler);
  //     }
  //   }
  // }, []);

  /* const handleSubmit = async () => {
    const requestData = {
      content: content,
      title: title,
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
  }; */

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
        style={{ marginBottom: 16, maxWidth: "715px" }}
        fullWidth
      />

      <QuillNoSSRWriter
        forwardedRef={quillInstance}
        value={content}
        onChange={(value) => {
          setContent(value);
          onContentChange(value);
        }}
        modules={modules}
        theme="snow"
        placeholder="내용을 입력해주세요."
        style={{ width: "auto", height: "600px" }}
      />

      {/* <ReactQuill
        style={{ width: "auto", height: "600px" }}
        placeholder="Quill Content"
        theme="snow"
        value={content}
        ref={(el) => {
          if (el) quillRef.current = el;
        }}
        onChange={(value) => {
          setContent(value);
          onContentChange(value);
        }}
        modules={modules}
      /> */}
      {/* <Button
        onClick={handleSubmit}
        variant="contained"
        color="primary"
        style={{ marginTop: 16 }}
      >
        Submit
      </Button> */}
    </Box>
  );
};

export default RichTextEditor2;
