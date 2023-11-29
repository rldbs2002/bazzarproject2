import ShopLayout2 from "../components/layouts/ShopLayout2";
import SEO from "../components/SEO";
import { NextPage } from "next";

import NoticeWrapper from "../components/project/NoticeWrapper";

const NoticePage: NextPage = () => {
  return (
    <ShopLayout2>
      <SEO title="Checkout alternative" />
      <NoticeWrapper />
    </ShopLayout2>
  );
};

export default NoticePage;
