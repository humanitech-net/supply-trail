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
import { styled } from "@mui/material/styles";

import { Routes, Route } from "react-router-dom";
import UserPage from "../../User/userPage";
import { DrawerContext } from "src/Pages/Home/ContextProvider/drawerProvider";
import { useMediaQuery, useTheme } from "@mui/material";

export default function MainContent() {
  const { open } = useContext(DrawerContext);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const Main = styled("main")(({ theme }) => ({
    marginLeft: open && isDesktop ? 240 : 0,
    marginTop: 80,
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  }));

  return (
    <Main>
      <Routes>
        <Route path="/profile" element={<UserPage />} />
      </Routes>
    </Main>
  );
}
