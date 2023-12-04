// eventIdPage.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const EventContent = ({ data, onEdit }: any) => {
  const router = useRouter();
  const { data: session } = useSession();

  const handleEdit = () => {
    onEdit();
  };

  const handleDelete = async () => {
    // 공지를 삭제하는 로직을 구현합니다
    try {
      const response = await fetch(`/api/event/${data._id}`, {
        method: "DELETE",
      });

      if (response.status === 200) {
        // 선택적으로 삭제 후 다른 페이지로 이동할 수 있습니다
        router.push("/event");
      } else {
        console.error("공지 삭제 중 오류:", response.statusText);
      }
    } catch (error: any) {
      console.error("공지 삭제 중 오류:", error.message);
    }
  };

  return (
    <div>
      {data && (
        <>
          <h1>{data.title}</h1>
          <p>{new Date(data.date).toLocaleDateString()}</p>
          <hr />
          <p
            style={{ marginTop: "2rem", marginBottom: "2rem" }}
            dangerouslySetInnerHTML={{ __html: data.content }}
          ></p>
        </>
      )}
    </div>
  );
};

const EventContents = ({ data }: any) => {
  const [eventData, setEventData] = useState<any>(null);
  const [editedContent, setEditedContent] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setEventData(data);
        setEditedContent(data.content);
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    fetchData();
  }, [data]);

  return (
    <div>
      <EventContent data={eventData} />
    </div>
  );
};

export default EventContents;
