import React from "react";
import Cart from "../components/project/Cart";
import { getAllCartData } from "../lib/data";

const CartPage = async () => {
  const data = await getAllCartData();
  console.log(data);

  return <Cart data={data} />;
};

export default CartPage;
