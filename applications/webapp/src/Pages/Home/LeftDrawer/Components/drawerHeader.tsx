import React from "react";
import { IconButton, styled } from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

interface DrawerHeaderProps {
  closeDrawer: () => void;
}

export default function DrawerHeader({ closeDrawer }: DrawerHeaderProps) {
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
  );
}
