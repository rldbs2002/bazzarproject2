"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { signOut } from "next-auth/react";

const buttonStyle = {
  fontSize: "16px",
  marginRight: "16px",
};

export default function Navbar() {
  const session = useSession();
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" }); // 로그아웃 후 리다이렉트할 URL 설정
  };

  // 함수를 이용하여 창 크기에 따라 메뉴 상태를 관리
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 950); // 화면 폭이 768px 이하면 모바일로 간주
  };

  useEffect(() => {
    handleResize(); // 페이지 로딩 시 한 번 호출
    window.addEventListener("resize", handleResize); // 창 크기가 변경될 때마다 호출
    return () => {
      window.removeEventListener("resize", handleResize); // 컴포넌트 언마운트 시 이벤트 제거
    };
  }, []);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  if (session.status === "unauthenticated") {
    router?.push("/");
  }

  const handleSignUpClick = () => {
    // "Sign up" 링크 클릭 시 메뉴를 닫지 않고 "/signup"으로 이동
    router.push("/signup");
  };

  return (
    <div>
      <AppBar position="static" color="primary">
        <Toolbar>
          {isMobile && ( // 모바일 화면에서는 메뉴 아이콘을 표시
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ marginRight: "16px" }}
              onClick={toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            One Delivery
          </Typography>
          {!isMobile && ( // 데스크톱 화면에서는 네비게이션 바에 메뉴 표시
            <ul className="flex justify-evenly text-white text-2xl font-bold">
              <li>
                <Link href="/">
                  <Button color="inherit" sx={buttonStyle}>
                    Home
                  </Button>
                </Link>
              </li>
              <li>
                <Link href="/notice">
                  <Button color="inherit" sx={buttonStyle}>
                    Notice
                  </Button>
                </Link>
              </li>
              {session.data?.user.role === "admin" && (
                <li>
                  <Link href="/server">
                    <Button color="inherit" sx={buttonStyle}>
                      Server
                    </Button>
                  </Link>
                </li>
              )}
              <li>
                <Link href="/newrequest">
                  <Button color="inherit" sx={buttonStyle}>
                    New Request
                  </Button>
                </Link>
              </li>
              {(session.data?.user.role === "admin" ||
                session.data?.user.role === "editor" ||
                session.data?.user.role === "user") && (
                <li>
                  <Link href="/requests">
                    <Button color="inherit" sx={buttonStyle}>
                      My Page
                    </Button>
                  </Link>
                </li>
              )}

              {session.status === "unauthenticated" && (
                <li>
                  <Link href="/api/auth/signin">
                    <Button color="inherit" sx={buttonStyle}>
                      Sign In
                    </Button>
                  </Link>
                </li>
              )}
              {session.status === "authenticated" && (
                <li>
                  <Button
                    color="inherit"
                    sx={buttonStyle}
                    onClick={() => handleSignOut()}
                  >
                    Sign Out
                  </Button>
                </li>
              )}
              {session.status === "unauthenticated" && (
                <li>
                  <Link href="/signup">
                    <Button color="inherit" sx={buttonStyle}>
                      Sign up
                    </Button>
                  </Link>
                </li>
              )}
            </ul>
          )}
        </Toolbar>
      </AppBar>
      {/* Drawer 메뉴 */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              One Delivery
            </Typography>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem>
            <Link href="/">
              <Button color="inherit" sx={buttonStyle}>
                Home
              </Button>
            </Link>
          </ListItem>
        </List>
        <List>
          <ListItem>
            <Link href="/notice">
              <Button color="inherit" sx={buttonStyle}>
                Notice
              </Button>
            </Link>
          </ListItem>
        </List>
        {session.data?.user.role === "admin" && (
          <List>
            <ListItem>
              <Link href="/server">
                <Button color="inherit" sx={buttonStyle}>
                  Server
                </Button>
              </Link>
            </ListItem>
          </List>
        )}
        <List>
          <ListItem>
            <Link href="/newrequest">
              <Button color="inherit" sx={buttonStyle}>
                New Request
              </Button>
            </Link>
          </ListItem>
        </List>
        {(session.data?.user.role === "admin" ||
          session.data?.user.role === "editor" ||
          session.data?.user.role === "user") && (
          <List>
            <ListItem>
              <Link href="/requests">
                <Button color="inherit" sx={buttonStyle}>
                  My Page
                </Button>
              </Link>
            </ListItem>
          </List>
        )}
        {(session.data?.user.role === "admin" ||
          session.data?.user.role === "editor") && (
          <List>
            <ListItem>
              <Link href="/extra">
                <Button color="inherit" sx={buttonStyle}>
                  Extra
                </Button>
              </Link>
            </ListItem>
          </List>
        )}
        {session.status === "unauthenticated" && (
          <List>
            <ListItem>
              <Link href="/api/auth/signin">
                <Button color="inherit" sx={buttonStyle}>
                  Sign In
                </Button>
              </Link>
            </ListItem>
          </List>
        )}
        {session.status === "authenticated" && (
          <List>
            <ListItem>
              <Link href="/signout">
                <Button color="inherit" sx={buttonStyle}>
                  Sign Out
                </Button>
              </Link>
            </ListItem>
          </List>
        )}
        {session.status === "unauthenticated" && (
          <List>
            <ListItem>
              <Link href="/signup">
                {/* "Sign up" 링크 클릭 시 handleSignUpClick 함수 실행 */}
                <Button
                  color="inherit"
                  sx={buttonStyle}
                  onClick={handleSignUpClick}
                >
                  Sign up
                </Button>
              </Link>
            </ListItem>
          </List>
        )}
      </Drawer>
    </div>
  );
}
