import { FC } from "react";
import {
  Box,
  Button,
  Container,
  MenuItem,
  styled,
  SvgIconProps,
} from "@mui/material";
import ArrowRight from "@mui/icons-material/ArrowRight";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  KeyboardArrowDown,
} from "@mui/icons-material";
import { NavLink } from "../nav-link";
import { FlexBox } from "../flex-box";
import BazaarCard from "../BazaarCard";
import useSettings from "@/app/hooks/useSettings";
import MegaMenu from "./MegaMenu";
import MegaMenu2 from "./MegaMenu2";

// NavList props interface
type Navs = {
  url: string;
  title: string;
  Icon?: (props: SvgIconProps<"svg", {}>) => JSX.Element;
};

type NavList = {
  url: string;
  title: string;
  child: Navs[];
  megaMenu: boolean;
  megaMenuWithSub: boolean;
};

// const common css style
const navLinkStyle = {
  cursor: "pointer",
  transition: "color 150ms ease-in-out",
  "&:hover": { color: "primary.main" },
  "&:last-child": { marginRight: 0 },
};
// style components
const StyledNavLink = styled(NavLink)({ ...navLinkStyle });

const ParentNav = styled(Box)(({ theme }) => ({
  "&:hover": {
    color: theme.palette.primary.main,
    "& > .parent-nav-item": { display: "block" },
  },
}));

const ParentNavItem = styled(Box)(({ theme }) => ({
  top: 0,
  zIndex: 5,
  left: "100%",
  paddingLeft: 8,
  display: "none",
  position: "absolute",
  [theme.breakpoints.down(1640)]: {
    right: "100%",
    left: "auto",
    paddingRight: 8,
  },
}));

const NavBarWrapper = styled(BazaarCard)<{ border: number }>(
  ({ theme, border }) => ({
    height: "0px",
    display: "block",
    borderRadius: "0px",
    position: "relative",
    ...(border && { borderBottom: `1px solid ${theme.palette.grey[200]}` }),
    [theme.breakpoints.down(1150)]: { display: "none" },
  })
);

const ChildNavsWrapper = styled(Box)({
  zIndex: 5,
  left: "50%",
  top: "100%",
  display: "none",
  position: "absolute",
  transform: "translate(-50%, 0%)",
});

// ==========================================================
type NavbarProps = {
  border?: number;
  elevation?: number;
  navListOpen?: boolean;
  hideCategories?: boolean;
};
// ==========================================================

const Navbar: FC<NavbarProps> = ({
  navListOpen,
  hideCategories,
  elevation,
  border,
}) => {
  const { settings } = useSettings();

  const renderNestedNav = (list: any[] = [], isRoot = false) => {
    return list.map((nav: NavList) => {
      if (isRoot) {
        // show megamenu
        if (nav.megaMenu) {
          return (
            //@ts-ignore
            <MegaMenu key={nav.title} title={nav.title} menuList={nav.child} />
          );
        }

        // show megamenu with sub
        if (nav.megaMenuWithSub) {
          return (
            //@ts-ignore
            <MegaMenu2 key={nav.title} title={nav.title} menuList={nav.child} />
          );
        }

        if (nav.url) {
          return (
            <StyledNavLink href={nav.url} key={nav.title}>
              {nav.title}
            </StyledNavLink>
          );
        }

        if (nav.child) {
          return (
            <FlexBox
              key={nav.title}
              alignItems="center"
              position="relative"
              flexDirection="column"
              sx={{
                "&:hover": { "& > .child-nav-item": { display: "block" } },
              }}
            >
              <FlexBox alignItems="flex-end" gap={0.3} sx={navLinkStyle}>
                {nav.title}{" "}
                <KeyboardArrowDown
                  sx={{ color: "grey.500", fontSize: "1.1rem" }}
                />
              </FlexBox>

              <ChildNavsWrapper className="child-nav-item">
                <BazaarCard
                  elevation={3}
                  sx={{ mt: 2.5, py: 1, minWidth: 200 }}
                >
                  {renderNestedNav(nav.child)}
                </BazaarCard>
              </ChildNavsWrapper>
            </FlexBox>
          );
        }
      } else {
        if (nav.url) {
          return (
            <NavLink href={nav.url} key={nav.title}>
              <MenuItem>{nav.title}</MenuItem>
            </NavLink>
          );
        }

        if (nav.child) {
          return (
            <ParentNav position="relative" minWidth="230px" key={nav.title}>
              <MenuItem color="grey.700">
                <Box flex="1 1 0" component="span">
                  {nav.title}
                </Box>

                {settings.direction === "ltr" ? (
                  <ArrowRight fontSize="small" />
                ) : (
                  <ArrowLeft fontSize="small" />
                )}
              </MenuItem>

              <ParentNavItem className="parent-nav-item">
                <BazaarCard
                  sx={{ py: "0.5rem", minWidth: "230px" }}
                  elevation={3}
                >
                  {renderNestedNav(nav.child)}
                </BazaarCard>
              </ParentNavItem>
            </ParentNav>
          );
        }
      }
    });
  };

  return (
    <NavBarWrapper
      hoverEffect={false}
      elevation={elevation}
      border={border}
    ></NavBarWrapper>
  );
};

//  set default props data
Navbar.defaultProps = {
  elevation: 2,
  navListOpen: false,
  hideCategories: false,
};

export default Navbar;
