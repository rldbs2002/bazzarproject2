import React from "react";
import Cart from "../components/project/Cart";

async function getData() {
  const res = await fetch("http://localhost:3000/api/request", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

const page = async () => {
  const data = await getData();
  console.log(data);
  return <Cart data={data} />;
};

export default page;
