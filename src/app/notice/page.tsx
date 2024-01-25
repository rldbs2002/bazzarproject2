import ShopLayout2 from "../components/layouts/ShopLayout2";
import SEO from "../components/SEO";

import NoticeWrapper from "../components/project/NoticeWrapper";

const NoticePage = () => {
  return (
    <ShopLayout2>
      <SEO title="Kgoods Notice Page" description="Kgoods's notice page" />
      <NoticeWrapper />
    </ShopLayout2>
  );
};

export default NoticePage;
