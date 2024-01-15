import React from "react";
import ShopLayout2 from "@/app/components/layouts/ShopLayout2";
import SEO from "@/app/components/SEO";
import { getCartData } from "@/app/lib/data";
import CartWrapper from "@/app/components/project/CartWrapper";

const CartIdPage = async ({ params }: { params: { id: string } }) => {
  const data = await getCartData(params.id);

  console.log(data);

  return (
    <ShopLayout2>
      <SEO title="Checkout alternative" />
      <CartWrapper data={data} />
    </ShopLayout2>
  );
};

export default CartIdPage;
