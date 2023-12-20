"use client";

import { getAllNoticeData } from "@/app/lib/data";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Paragraph } from "../Typography";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Button, Stack, Pagination } from "@mui/material";
import { useSession } from "next-auth/react";

type NoticeItem = {
  _id: string;
  title: string;
  content: string;
  date: string;
  writer: string;
  // 다른 필요한 속성들도 추가할 수 있습니다.
};

const Notice: React.FC = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [notices, setNotices] = useState<NoticeItem[]>([]);

  const [page, setPage] = useState(0); // Add state for page number
  const [rowsPerPage, setRowsPerPage] = useState(5); // Add state for rows per page

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleCreate = () => {
    router.push("/notice-create");
  };

  const handleEditClick = (itemId: string) => {
    router.push(`/notice/${itemId}/edit`);
  };

  const handleDeleteClick = async (itemId: string) => {
    // 공지를 삭제하는 로직을 구현합니다
    try {
      const response = await fetch(`/api/notice/${itemId}`, {
        method: "DELETE",
      });

      if (response.status === 200) {
        // 선택적으로 삭제 후 다른 페이지로 이동할 수 있습니다
        router.push("/notice");
      } else {
        console.error("공지 삭제 중 오류:", response.statusText);
      }
    } catch (error: any) {
      console.error("공지 삭제 중 오류:", error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllNoticeData();

        const sortedNotices = result.sort(
          (a: NoticeItem, b: NoticeItem) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        setNotices(sortedNotices);
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
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {session?.user.role === "admin" && (
          <Button
            variant="outlined"
            color="error"
            style={{ width: "70px", height: "40px", marginLeft: "auto" }}
            onClick={handleCreate}
          >
            Create
          </Button>
        )}
      </div>
      <div>
        {notices
          .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
          .map((notice) => (
            <div
              key={notice._id}
              style={{
                marginBottom: "2rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between", // Align items in a row with space between
                  alignItems: "center", // Center items vertically
                  marginBottom: "1rem",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.3em",
                    margin: "10px 0",
                    fontWeight: "bold",
                    cursor: "pointer",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap", // 필요한 경우 한 줄에 표시하도록 설정
                  }}
                  onClick={() => handleCellClick(notice._id)}
                >
                  {notice.title}
                </h3>
                {session?.user.role === "admin" && (
                  <div
                    style={{
                      display: "flex",
                      gap: "0.5rem",
                    }}
                  >
                    <FaEdit
                      onClick={() => handleEditClick(notice._id)}
                      style={{ cursor: "pointer" }}
                    />
                    <FaTrash
                      onClick={() => handleDeleteClick(notice._id)}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                )}
              </div>
              <p style={{ marginBottom: "1rem" }}>
                {new Date(notice.date).toLocaleDateString()} | By{" "}
                {notice.writer}
              </p>
              {/* 여기에 내용 등 필요한 정보 추가 */}
              <hr />
            </div>
          ))}
      </div>

      <Stack alignItems="center" my={3} margin="1rem">
        <Pagination
          count={Math.ceil(notices.length / rowsPerPage)}
          page={page + 1}
          color="primary"
          onChange={(event, newPage) => {
            handleChangePage(null, newPage - 1);
          }}
        />
      </Stack>
    </>
  );
};

export default Notice;
