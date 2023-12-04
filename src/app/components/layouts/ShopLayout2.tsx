"use client";

import { FC, Fragment, ReactNode, useCallback, useState } from "react";
import { Box } from "@mui/material";
import Sticky from "../Sticky";
// import Navbar from "../navbar/Navbar";
import SearchInput from "../search-box/SearchInput";
import { Footer3 } from "../footer";
import Header from "@/app/landing/Header";

/**
 *  Used in:
 *  1. grocery1, grocery2, healthbeauty-shop
 *  2. checkout-alternative
 */

// =======================================================
type ShopLayout2Props = {
  children: ReactNode;
  showNavbar?: boolean;
  showTopbar?: boolean;
};
// =======================================================

const ShopLayout2: FC<ShopLayout2Props> = ({
  children,
  showTopbar = true,
  showNavbar = true,
}) => {
  const [isFixed, setIsFixed] = useState(false);
  const toggleIsFixed = useCallback((fixed: boolean) => setIsFixed(fixed), []);

  return (
    <Fragment>
      {/* TOPBAR */}
      {/* {showTopbar && <Topbar />} */}

      {/* HEADER */}
      {/* <Sticky fixedOn={0} onSticky={toggleIsFixed} scrollDistance={70}>
        <Header isFixed={isFixed} searchInput={<SearchInput />} />
      </Sticky> */}
      <Header />

      <Box zIndex={4} position="relative" className="section-after-sticky">
        {/* NAVIGATION BAR */}
        {/* {showNavbar && <Navbar elevation={0} />} */}

        {/* BODY CONTENT */}
        {children}

        {/* FOOTER CONTENT */}
        <Footer3 />
      </Box>
    </Fragment>
  );
};

export default ShopLayout2;
