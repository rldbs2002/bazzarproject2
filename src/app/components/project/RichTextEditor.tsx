"use client";

import React, { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import FroalaEditor from "react-froala-wysiwyg";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/js/plugins/image.min.js";
import "froala-editor/js/plugins/char_counter.min.js";
import "froala-editor/js/plugins/save.min.js";
import { Button, TextField, Box } from "@mui/material";

const RichTextEditor = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [model, setModel] = useState("");

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const extractTextFromHTML = (htmlString: string) => {
    const doc = new DOMParser().parseFromString(htmlString, "text/html");
    return doc.body.textContent || "";
  };

  const handleSubmit = async () => {
    const cleanedModel = extractTextFromHTML(model);

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

      <FroalaEditor
        model={model}
        onModelChange={(e: string) => setModel(e)}
        config={{
          placeholderText: "Start Writing...",
        }}
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
