import React from "react";
import ShopLayout2 from "../components/layouts/ShopLayout2";
import AccountLayer from "../components/project/AccountLayer";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";

async function getData() {
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
  const session = await getServerSession(options);
  console.log(session);

  return (
    <ShopLayout2>
      <AccountLayer data={data} />
    </ShopLayout2>
  );
};

export default page;
