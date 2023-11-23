import React from "react";
import ShopLayout2 from "@/app/components/layouts/ShopLayout2";
import SEO from "@/app/components/SEO";
import { NextPage } from "next";
import CartLayer from "@/app/components/project/CartWrapper";
import { getCartData } from "@/app/lib/data";

const CartPage: NextPage = async ({ params }: any) => {
  const data = await getCartData(params.id);

  return (
    <ShopLayout2>
      <SEO title="Checkout alternative" />
      <CartLayer data={data} />
    </ShopLayout2>
  );
};

export default CartPage;
