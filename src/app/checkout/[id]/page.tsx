import { NextPage } from "next";
import ShopLayout2 from "@/app/components/layouts/ShopLayout2";
import CheckoutLayer from "@/app/components/project/CheckoutWrapper";
import { getCheckoutData } from "@/app/lib/data";

const OrderDetails: NextPage = async ({ params }: any) => {
  const data = await getCheckoutData(params.id);

  return (
    <ShopLayout2>
      <CheckoutLayer data={data} />
    </ShopLayout2>
  );
};

export default OrderDetails;
