import ShopLayout2 from "@/app/components/layouts/ShopLayout2";
import CheckoutWrapper from "@/app/components/project/CheckoutWrapper";
import { getCheckoutData } from "@/app/lib/data";

const CheckoutIdPage = async ({ params }: { params: { id: string } }) => {
  const data = await getCheckoutData(params.id);

  return (
    <ShopLayout2>
      <CheckoutWrapper data={data} />
    </ShopLayout2>
  );
};

export default CheckoutIdPage;
