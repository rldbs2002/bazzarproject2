import ShopLayout2 from "@/app/components/layouts/ShopLayout2";
import AdminCheckoutWrapper from "@/app/components/project/AdminCheckoutWrapper";
import React from "react";
export const dynamic = "force-dynamic";

const AdminRequestPage = () => {
  return (
    <ShopLayout2>
      <AdminCheckoutWrapper />
    </ShopLayout2>
  );
};

export default AdminRequestPage;
