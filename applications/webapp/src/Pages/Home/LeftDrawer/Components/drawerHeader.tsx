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
import { IconButton, styled } from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import { DrawerContext } from "../../ContextProvider/drawerProvider";

export default function DrawerHeader() {
  const { open, setOpen } = useContext(DrawerContext);

  const closeDrawer = React.useCallback(() => {
    setOpen(false);
  }, [open]);

  const Header = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
    paddingLeft: 22,
    backgroundColor: "#011C27",
  }));

  return (
    <Header>
      <IconButton
        color="inherit"
        aria-label="close drawer"
        onClick={closeDrawer}
        edge="start"
        sx={{ color: "white" }}
      >
        <MenuIcon />
      </IconButton>
    </Header>
  );
}
