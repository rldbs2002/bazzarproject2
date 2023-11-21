import React, { FC } from "react";
import Repacking from "../components/project/Repacking";
import ShopLayout2 from "../components/layouts/ShopLayout2";
import SEO from "../components/SEO";
import { notFound } from "next/navigation";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

async function getData() {
  const res = await fetch("http://localhost:3000/api/repacking", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

async function getUserData() {
  const res = await fetch(`http://localhost:3000/api/user`, {
    cache: "no-store",
  });
  if (!res.ok) {
    return notFound();
  }
  return res.json();
}

const page = async () => {
  const data = await getData();
  const userdata = await getUserData();

  return (
    <ShopLayout2>
      <SEO title="Checkout alternative" />

      <Repacking data={data} userdata={userdata} />
    </ShopLayout2>
  );
};

export default page;
