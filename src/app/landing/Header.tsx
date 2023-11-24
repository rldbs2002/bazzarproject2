"use client";

import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import debounce from "lodash/debounce";
import { Link as Scroll } from "react-scroll";
import {
  Box,
  Button,
  Container,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Menu from "@mui/icons-material/Menu";
import { styled, Theme } from "@mui/material/styles";
import { keyframes } from "@mui/styled-engine";
import clsx from "clsx";
import Image from "../components/BazaarImage";
import { FlexBox } from "../components/flex-box";
import Sidenav from "../components/Sidenav";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

const headerHeight = 72;

const slideFromTop = keyframes`
from { top: -${headerHeight}px; }
to { top: 0; }`;

const HeaderWrapper = styled(Box)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.grey[200]}`,
  "& .link": {
    cursor: "pointer",
    transition: "color 250ms ease-in-out",
    fontWeight: 500,
    "&:hover": { color: theme.palette.primary.main },
  },

  "& .fixedHeader": {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 99,
    background: "white",
    height: headerHeight,
    boxShadow: theme.shadows[2],
    animation: `${slideFromTop} 250ms ease-in-out`,
    "& .link": { color: "inherit" },
  },

  [theme.breakpoints.down("sm")]: {
    "& .right-links": { display: "none" },
    "& .purchase-link": { display: "none" },
  },
}));

const Header = () => {
  const session = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isFixed, setFixed] = useState(false);
  const downSM = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

  const toggleSidenav = () => setOpen((open) => !open);

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" }); // 로그아웃 후 리다이렉트할 URL 설정
  };

  const scrollListener = debounce(() => {
    if (window?.pageYOffset >= headerHeight) setFixed(true);
    else setFixed(false);
  }, 50);

  // useEffect(() => {
  //   if (!window) return null;

  //   window.addEventListener("scroll", scrollListener);
  //   return () => window.removeEventListener("scroll", scrollListener);
  // }, [scrollListener]);

  // 세션이 "unauthenticated" 상태일 때만 홈으로 리디렉션하지 않도록 처리
  // useEffect(() => {
  //   if (session.status === "unauthenticated" && router.pathname !== "/") {
  //     router.push("/");
  //   }
  // }, [session, router]);

  return (
    <Fragment>
      <HeaderWrapper>
        <Box className={clsx({ fixedHeader: isFixed })}>
          <Container>
            <FlexBox height={headerHeight} alignItems="center">
              <Scroll to="top" duration={400} smooth={true} isDynamic>
                <Box sx={{ cursor: "pointer" }}>
                  <Image
                    width="96px"
                    height="44px"
                    src="/assets/images/logo2.svg"
                    alt="logo"
                  />
                </Box>
              </Scroll>

              <Box sx={{ mx: "auto" }}></Box>

              <FlexBox className="right-links" alignItems="center">
                <Link href="/notice">
                  <Typography
                    className="link"
                    color="grey.600"
                    p="0.25rem 1.25rem"
                  >
                    Notice
                  </Typography>
                </Link>

                <Link href="/newrequest">
                  <Typography
                    className="link"
                    color="grey.600"
                    p="0.25rem 1.25rem"
                  >
                    New Request
                  </Typography>
                </Link>

                <Link href="/mypage">
                  <Typography
                    className="link"
                    color="grey.600"
                    p="0.25rem 1.25rem"
                  >
                    Requests
                  </Typography>
                </Link>
              </FlexBox>

              {!downSM && (
                <Link
                  href={
                    session.status === "unauthenticated"
                      ? "/signin"
                      : "/signout"
                  }
                >
                  <Button variant="outlined">
                    {session.status === "unauthenticated"
                      ? "Sign In"
                      : "Sign Out"}
                  </Button>
                </Link>
              )}

              {/* mobile menu */}
              {downSM && (
                <Sidenav
                  open={open}
                  width={260}
                  position="right"
                  toggleSidenav={toggleSidenav}
                  handle={
                    <IconButton>
                      <Menu />
                    </IconButton>
                  }
                >
                  <Box
                    p={2}
                    sx={{
                      "& .link": {
                        cursor: "pointer",
                        transition: "color 250ms ease-in-out",
                        "&:hover": { color: "primary.main" },
                      },
                    }}
                  >
                    <Link href="/notice">
                      <Typography
                        className="link"
                        py={1}
                        mb={2}
                        onClick={toggleSidenav}
                      >
                        Notice
                      </Typography>
                    </Link>

                    <Link href="/newrequest">
                      <Typography
                        className="link"
                        py={1}
                        mb={2}
                        onClick={toggleSidenav}
                      >
                        New Request
                      </Typography>
                    </Link>

                    <Link href="/">
                      <Typography
                        className="link"
                        py={1}
                        mb={2}
                        onClick={toggleSidenav}
                      >
                        Requests
                      </Typography>
                    </Link>

                    <Link href="/my">
                      <Typography
                        className="link"
                        py={1}
                        mb={2}
                        onClick={toggleSidenav}
                      >
                        My
                      </Typography>
                    </Link>

                    <Link
                      href={
                        session.status === "unauthenticated"
                          ? "/api/auth/signin"
                          : "/signout"
                      }
                    >
                      <Typography
                        className="link"
                        py={1}
                        mb={2}
                        onClick={toggleSidenav}
                      >
                        {session.status === "unauthenticated"
                          ? "Sign In"
                          : "Sign Out"}
                      </Typography>
                    </Link>
                  </Box>
                </Sidenav>
              )}
            </FlexBox>
          </Container>
        </Box>
      </HeaderWrapper>

      {isFixed && <Box height={headerHeight} />}
    </Fragment>
  );
};

export default Header;
