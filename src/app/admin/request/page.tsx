import SEO from "@/app/components/SEO";
import ShopLayout2 from "@/app/components/layouts/ShopLayout2";
import AdminRequestWrapper from "@/app/components/project/AdminRequestWrapper";
import React from "react";
export const dynamic = "force-dynamic";

const AdminRequestPage = () => {
  return (
    <ShopLayout2>
      <AdminRequestWrapper />
    </ShopLayout2>
  );
};

export default AdminRequestPage;
