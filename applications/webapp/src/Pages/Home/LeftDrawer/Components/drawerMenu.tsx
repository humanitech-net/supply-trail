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
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { drawerMenu } from "../util/constants";

export default function DrawerMenu() {
  return (
    <List
      sx={{
        backgroundColor: "#011C27",
        color: "white",
      }}
    >
      {drawerMenu.map((text) => (
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
  );
}
