"use client";

import { getAllNoticeData } from "@/app/lib/data";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Paragraph } from "../Typography";

type NoticeItem = {
  _id: string;
  title: string;
  content: string;
  date: string;
  // 다른 필요한 속성들도 추가할 수 있습니다.
};

const Notice: React.FC = () => {
  const router = useRouter();

  const [notices, setNotices] = useState<NoticeItem[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const noticesPerPage = 5; // Adjust the number of notices per page as needed

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllNoticeData();

        setNotices(result);
      } catch (error: any) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  const handleCellClick = (itemId: string) => {
    router.push(`/notice/${itemId}`);
  };

  return (
    <>
      <Paragraph
        style={{ fontSize: "1.7rem", marginBottom: "1rem", fontWeight: "bold" }}
      >
        Notices
      </Paragraph>
      <div>
        {notices.map((notice) => (
          <div
            key={notice._id}
            onClick={() => handleCellClick(notice._id)}
            style={{ marginBottom: "2rem" }}
          >
            <h3
              style={{
                fontSize: "1.3em",
                margin: "10px 0",
                fontWeight: "bold",
              }}
            >
              {notice.title}
            </h3>
            <p style={{ marginBottom: "1rem" }}>
              {new Date(notice.date).toLocaleDateString()}
            </p>
            {/* 여기에 내용 등 필요한 정보 추가 */}
            <hr />
          </div>
        ))}
      </div>
    </>
  );
};

export default Notice;
