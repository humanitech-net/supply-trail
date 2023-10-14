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
import { styled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import { Routes, Route } from "react-router-dom";
import UserPage from "../Pages/User/userPage";

interface HandleDrawer {
  open: boolean;
}

export default function MainContent({ open }: Readonly<HandleDrawer>) {
  const drawerWidth = 240;
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const Main = styled("main", {
    shouldForwardProp: (prop) => prop !== "open",
  })<{
    open?: boolean;
  }>(({ theme }) => ({
    marginTop: 80,
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),

    ...(isDesktop && {
      ...(open && {
        marginLeft: drawerWidth,
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      }),
    }),
  }));
  return (
    <Main open={open}>
      <Routes>
        <Route path="/profile" element={<UserPage />} />
      </Routes>
    </Main>
  );
}
