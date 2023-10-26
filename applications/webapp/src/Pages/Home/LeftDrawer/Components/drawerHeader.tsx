import React, { useContext } from "react";
import { IconButton, styled } from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import { DrawerContext } from "../../ContextProvider/drawerProvider";

export default function DrawerHeader() {
  const { setOpen } = useContext(DrawerContext);

  const closeDrawer = () => {
    setOpen(false);
  };

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
