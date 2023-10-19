"use client";

import "@uploadthing/react/styles.css";
import { useState, useEffect } from "react";
import Link from "next/link";
import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "../../api/uploadthing/core";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function ArrivedUploadButton({ data, selectedRequest }: any) {
  const [submitCompleted, setsubmitCompleted] = useState(false); // State for the completion flag
  console.log("Selected Request:", selectedRequest);
  const router = useRouter();

  const [images, setImages] = useState<
    {
      fileUrl: string;
      fileKey: string;
    }[]
  >([]);

  // Function to handle the upload completion
  const handleUploadComplete = async (res: any) => {
    if (res) {
      setImages(res);
      const json = JSON.stringify(res);
      // Do something with the response
      console.log(json);

      // Extract image file keys and send them to your server
      const imageFileUrls = res.map((image: any) => image.fileUrl);

      console.log("imageFileUrls:", imageFileUrls);

      // try {
      //   // Send the image file keys to your server using a PUT request
      //   const response = await fetch(`/api/request/${selectedRequest._id}`, {
      //     method: "PUT",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       arrived: { arrived_images: imageFileUrls, arrived_at: new Date() },
      //       // "arrived_images" 필드를 "arrived.images" 배열로 변경
      //       // 현재 날짜 및 시간을 arrived_at에 추가
      //       status: 5, // 상태를 5로 업데이트
      //     }),
      //   });

      //   if (response.ok) {
      //     // Handle a successful response from the server
      //     console.log("Image file keys sent to the server.");
      //   } else {
      //     // Handle errors from the server
      //     console.error("Server responded with an error.");
      //   }
      // } catch (error) {
      //   // Handle network or other errors
      //   console.error("Error sending image file keys to the server:", error);
      // }
    }
  };

  const handleCheckboxChange = () => {
    // Toggle the completion flag when the checkbox is checked or unchecked
    setsubmitCompleted(!submitCompleted);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const imageFileUrls = images.map((image: any) => image.fileUrl);

      const response = await fetch(`/api/request/${selectedRequest._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          arrived: {
            arrived_images: imageFileUrls,
            arrived_at: new Date(),
            arrived_complete: submitCompleted, // 업로드 완료 여부 업데이트
          },
          status: 5,
        }),
      });

      if (response.ok) {
        console.log("Image file keys sent to the server.");
        router.push("/");
      } else {
        console.error("Server responded with an error.");
      }
    } catch (error) {
      console.error("Error handling submission:", error);
    }
  };

  // Render the uploaded images
  const imgList = (
    <>
      <ul>
        {images.map((image) => (
          <li key={image.fileKey} className="mt-2">
            <Link href={`https://utfs.io/f/${image.fileKey}`} target="_blank">
              {`https://utfs.io/f/${image.fileKey}`}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );

  return (
    <main className="flex flex-col items-center justify-start p-24">
      <h1>Arrived Image Upload</h1>
      <UploadButton<OurFileRouter>
        endpoint="imageUploader"
        onClientUploadComplete={handleUploadComplete}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
      {imgList}
      <div>
        <label>
          <input
            type="checkbox"
            checked={submitCompleted}
            onChange={handleCheckboxChange}
          />
          Completed
        </label>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          type="submit"
        >
          Submit
        </Button>
      </div>
    </main>
  );
}
