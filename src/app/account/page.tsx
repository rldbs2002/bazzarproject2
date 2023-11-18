import React from "react";
import ShopLayout2 from "../components/layouts/ShopLayout2";
import AccountLayer from "../components/project/AccountLayer";
import { notFound } from "next/navigation";

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
  console.log(data);

  return (
    <ShopLayout2>
      <AccountLayer data={data} />
    </ShopLayout2>
  );
};

export default page;
