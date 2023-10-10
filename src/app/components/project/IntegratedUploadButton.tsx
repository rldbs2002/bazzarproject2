"use client";

import "@uploadthing/react/styles.css";
import { useState } from "react";
import Link from "next/link";
import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "../api/uploadthing/core";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function IntegratedUploadButton({ params, uploadType }: any) {
  const [images, setImages] = useState<
    {
      fileUrl: string;
      fileKey: string;
    }[]
  >([]);

  const router = useRouter();

  const [submitCompleted, setsubmitCompleted] = useState(false); // State for the completion flag

  const handleUploadComplete = async (res: any) => {
    if (res) {
      setImages(res);
      const json = JSON.stringify(res);
      console.log(json);

      const imageFileUrls = res.map((image: any) => image.fileUrl);

      try {
        const response = await fetch(`/api/request/${params.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            [uploadType]: {
              [`${uploadType}_images`]: imageFileUrls,
              [`${uploadType}_at`]: new Date(),
            },
          }),
        });

        if (response.ok) {
          console.log("Image file keys sent to the server.");
          // Do not set submitCompleted here
        } else {
          console.error("Server responded with an error.");
        }
      } catch (error) {
        console.error("Error sending image file keys to the server:", error);
      }
    }
  };

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

  const getUploadTypeText = () => {
    if (uploadType === "arrived") {
      return "Arrived";
    } else if (uploadType === "repacking") {
      return "Repacking";
    } else if (uploadType === "shipping") {
      return "Shipping";
    } else {
      return "Unknown";
    }
  };

  const handleCheckboxChange = () => {
    // Toggle the completion flag when the checkbox is checked or unchecked
    setsubmitCompleted(!submitCompleted);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // 체크 상태를 확인하여 체크되지 않았을 때는 submit을 하지 않음
    if (!submitCompleted) {
      console.log("Checkbox is not checked. Submission canceled.");
      return;
    }

    try {
      let status = 0;

      if (uploadType === "arrived") {
        status = 5;
      } else if (uploadType === "repacking") {
        status = 6;
      } else if (uploadType === "shipping") {
        status = 7;
      }

      const response = await fetch(`/api/request/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          [uploadType]: {
            [`${uploadType}_completed`]: submitCompleted,
          },
          status,
        }),
      });

      if (response.ok) {
        console.log("Data sent to the server.");
        console.log(uploadType);
        router.push("/server"); // "/server"로 리다이렉션합니다.
      } else {
        console.error("Server responded with an error.");
      }
    } catch (error) {
      console.error("Error sending data to the server:", error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <h1>{getUploadTypeText()} Image Upload</h1>
      <UploadButton<OurFileRouter>
        endpoint="imageUploader"
        onClientUploadComplete={handleUploadComplete}
        onUploadError={(error: Error) => {
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
