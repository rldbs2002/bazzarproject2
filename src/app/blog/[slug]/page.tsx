import { FC } from "react";
import { allDocs } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { Mdx } from "@/app/components/project/Mdx";
import ShopLayout2 from "@/app/components/layouts/ShopLayout2";
import Card1 from "@/app/components/Card1";
import { Container } from "@mui/material";
import { Paragraph } from "@/app/components/Typography";

interface pageProps {
  params: {
    slug: string;
  };
}

async function getDocFromParams(slug: string) {
  const doc = allDocs.find((doc) => doc.slugAsParams === slug);

  if (!doc) notFound();

  return doc;
}

const page = async ({ params }: pageProps) => {
  const doc = await getDocFromParams(params.slug);

  // doc.date 값을 Date 객체로 파싱합니다.
  const dateObj = new Date(doc.date);

  // 날짜를 원하는 형식으로 포맷팅합니다.
  const formattedDate = dateObj.toISOString().split("T")[0]; // "2021-12-24" 형식으로 변환

  return (
    <ShopLayout2>
      <Container sx={{ my: "1.5rem" }}>
        <Card1>
          <Paragraph
            style={{
              fontSize: "1.7rem",
              marginBottom: "1rem",
              fontWeight: "bold",
            }}
          >
            {doc.title}
          </Paragraph>
          <h3
            style={{
              fontSize: "1.3em",
              margin: "10px 0",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap", // 필요한 경우 한 줄에 표시하도록 설정
            }}
          >
            {formattedDate}
          </h3>
          <Mdx code={doc.body.code} />
        </Card1>
      </Container>
    </ShopLayout2>
  );
};

export default page;
