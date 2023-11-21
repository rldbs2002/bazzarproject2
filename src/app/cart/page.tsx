import React from "react";
import Cart from "../components/project/Cart";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

async function getData() {
  const res = await fetch("http://localhost:3000/api/cart", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

const CartPage = async ({ params }: any) => {
  const data = await getData();

  return <Cart data={data} />;
};

export default CartPage;
