/**
 * Humanitech Supply Trail
 *
 * Copyright (c) Humanitech, Peter Rogov and Contributors
 *
 * Website: https://humanitech.net
 * Repository: https://github.com/humanitech-net/supply-trail
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useContext } from "react";
import { useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import useMediaQuery from "@mui/material/useMediaQuery";
import DrawerHeader from "./Components/drawerHeader";
import DrawerMenu from "./Components/drawerMenu";
import { styles } from "./util/style";
import { DrawerContext } from "../ContextProvider/drawerProvider";
// import { DrawerContext } from "./Components/DrawerContextProvider";

export default function LeftDrawer() {
  const theme = useTheme();
  const style = styles();

  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const { open } = useContext(DrawerContext);

  return (
    <Drawer
      aria-label="drawer"
      sx={style.drawer}
      variant={isDesktop ? "persistent" : "temporary"}
      open={open}
    >
      <DrawerHeader />
      <DrawerMenu />
    </Drawer>
  );
}
