import React from "react";
import Cart from "../components/project/Cart";
import useSWR from "swr";
import { getAllCartData } from "../lib/data";

const CartPage = async ({ params }: any) => {
  const data = await getAllCartData();

  return <Cart data={data} />;
};

export default CartPage;
