import { FC } from "react";
import { Box } from "@mui/material";
import { FlexBox } from "./flex-box";
import PlayStore from "./icons/PlayStore";
import AppleStore from "./icons/AppleStore";

const AppStore: FC = () => {
  // data
  const appList = [
    { icon: PlayStore, title: "Google Play", subtitle: "Get it on", url: "/" },
    {
      icon: AppleStore,
      title: "App Store",
      subtitle: "Download on the",
      url: "/",
    },
  ];

  return (
    <FlexBox flexWrap="wrap" m={-1}>
      
    </FlexBox>
  );
};

export default AppStore;
