"use client";

import "@uploadthing/react/styles.css";
import { useState, useEffect } from "react";
import Link from "next/link";
import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "../../api/uploadthing/core";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function ShippingUploadButton({ data }: any) {
  const [submitCompleted, setsubmitCompleted] = useState(false); // State for the completion flag
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

      try {
        const imageFileUrls = res.map((image: any) => image.fileUrl);

        const response = await fetch(`/api/checkout/${data}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            shipping: {
              shipping_images: imageFileUrls,
              shipping_at: new Date(),
            },
            status: 7,
          }),
        });

        if (response.ok) {
          console.log("Image file keys sent to the server.");
          router.push(`/checkout/${data}`);
        } else {
          console.error("Server responded with an error.");
        }
      } catch (error) {
        console.error("Error handling submission:", error);
      }
    }
  };

  return (
    <main className="flex flex-col items-center justify-start p-24">
      <h1>Shipping Image Upload</h1>
      <UploadButton<OurFileRouter>
        endpoint="imageUploader"
        onClientUploadComplete={handleUploadComplete}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </main>
  );
}
