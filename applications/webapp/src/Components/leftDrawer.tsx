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
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";

interface DrawerProps {
  open: boolean;
  closeDrawer: () => void;
}

export default function LeftDrawer({ open, closeDrawer }: DrawerProps) {
  const drawerWidth = 240;
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const menu = [
    "Supply",
    "Tracking",
    "Inventory",
    "Logistics",
    "Schools",
    "Analytics",
    "Contact List",
  ];

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
    paddingLeft: 22,
    backgroundColor: "#011C27",
  }));

  return (
    <Drawer
      aria-label="drawer"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#011C27",
        },
      }}
      variant={isDesktop ? "persistent" : "temporary"}
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <IconButton
          color="inherit"
          aria-label="close drawer"
          onClick={closeDrawer}
          edge="start"
          sx={{ color: "white" }}
        >
          <MenuIcon />
        </IconButton>
      </DrawerHeader>
      <List
        sx={{
          backgroundColor: "#011C27",
          color: "white",
        }}
      >
        {menu.map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
