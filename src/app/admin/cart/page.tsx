import SEO from "@/app/components/SEO";
import ShopLayout2 from "@/app/components/layouts/ShopLayout2";
import AdminCartWrapper from "@/app/components/project/AdminCartWrapper";
import React from "react";
export const dynamic = "force-dynamic";

const AdminRequestPage = () => {
  return (
    <ShopLayout2>
      <AdminCartWrapper />
    </ShopLayout2>
  );
};

export default AdminRequestPage;
