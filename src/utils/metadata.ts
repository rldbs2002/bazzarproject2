import { Metadata } from "next";

interface MetadataProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  label1?: {
    name: string;
    data: string | number;
  };
  label2?: {
    name: string;
    data: string | number;
  };
}

const webUrl = "https://bazzarproject2.vercel.app/";

const defaultImage = `/main.png`;

export default function metadata(props: MetadataProps): Metadata {
  const { title, description: desc, path, image, label1, label2 } = props;
  const description = desc + " | Kgoods";

  const images = webUrl + (image ?? defaultImage);

  return {
    title,
    description,

    openGraph: {
      title,
      description,
      url: webUrl + path,
      siteName: "bazzarproject2.vercel.app",
      images,
      locale: "ko_KR",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
    },
    other: {
      ["twitter:label1"]: label1?.name ?? "",
      ["twitter:data1"]: label1?.data ?? "",
      ["twitter:label2"]: label2?.name ?? "",
      ["twitter:data2"]: label2?.data ?? "",
    },
  };
}