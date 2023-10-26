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

import React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import NavBar from "../../Components/navbar";
import LeftDrawer from "./LeftDrawer/leftDrawer";
import MainContent from "./MainContent/mainContent";
import { DrawerProvider } from "./ContextProvider/drawerProvider";

export default function Home() {
  return (
    <DrawerProvider>
      <Box>
        <CssBaseline />
        <NavBar />
        <LeftDrawer />
        <MainContent />
      </Box>
    </DrawerProvider>
  );
}
